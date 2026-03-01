/**
 * VuePress to VitePress 博客迁移脚本
 * 功能：
 * 1. 复制 Markdown 文件并保持目录结构
 * 2. 转换 Frontmatter 格式（移除 VitePress 不支持的字段）
 * 3. 转换容器语法（:::: -> :::）
 * 4. 标准化日期格式
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置
const SOURCE_DIR = path.resolve(__dirname, '../../vuepressBlog的副本/docs');
const TARGET_DIR = path.resolve(__dirname, '..');
const CATEGORIES_TO_MIGRATE = ['algorithm', 'fe', 'java', 'cryptology', 'designpartern', 'other'];

// 统计信息
let stats = {
  totalFiles: 0,
  migratedFiles: 0,
  skippedFiles: 0,
  errors: []
};

/**
 * 转换 Frontmatter
 * - 保留 title, date
 * - 移除 categories, tags, sidebar, sticky, home, bgImageStyle, heroText, tagline
 * - 标准化日期格式为 YYYY-MM-DD
 */
function transformFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return content;
  }

  const frontmatterContent = match[1];
  const lines = frontmatterContent.split('\n');
  const newLines = [];
  let skipUntilNextKey = false;
  
  // 需要保留的字段
  const keepFields = ['title', 'date', 'description', 'layout'];
  // 需要跳过的字段（包括其子内容）
  const skipFields = ['categories', 'tags', 'sidebar', 'sticky', 'home', 'bgImageStyle', 'heroText', 'tagline', 'hero', 'features'];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    
    // 检查是否是字段行（不以空格开头或以 - 开头的缩进内容）
    const isFieldLine = !line.startsWith(' ') && !line.startsWith('\t') && line.includes(':');
    
    if (isFieldLine) {
      const fieldName = line.split(':')[0].trim();
      
      if (skipFields.includes(fieldName)) {
        skipUntilNextKey = true;
        continue;
      }
      
      if (keepFields.includes(fieldName)) {
        skipUntilNextKey = false;
        
        // 特殊处理日期格式
        if (fieldName === 'date') {
          const dateMatch = line.match(/date:\s*(.+)/);
          if (dateMatch) {
            const dateStr = dateMatch[1].trim();
            const normalizedDate = normalizeDate(dateStr);
            newLines.push(`date: ${normalizedDate}`);
            continue;
          }
        }
        
        newLines.push(line);
        continue;
      }
      
      // 其他字段也跳过
      skipUntilNextKey = true;
    } else if (!skipUntilNextKey) {
      // 保留非字段行（如果不在跳过模式下）
      newLines.push(line);
    }
  }

  // 如果没有有效的 frontmatter 内容，返回不带 frontmatter 的内容
  const validLines = newLines.filter(line => line.trim() !== '');
  if (validLines.length === 0) {
    return content.replace(frontmatterRegex, '').trim();
  }

  const newFrontmatter = `---\n${newLines.join('\n')}\n---`;
  return content.replace(frontmatterRegex, newFrontmatter);
}

/**
 * 标准化日期格式为 YYYY-MM-DD
 */
function normalizeDate(dateStr) {
  // 处理 2022-4-8 格式
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const year = parts[0];
    const month = parts[1].padStart(2, '0');
    const day = parts[2].padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return dateStr;
}

/**
 * 转换容器语法
 * VuePress (vuepress-theme-reco) 使用 :::: 
 * VitePress 使用 :::
 */
function transformContainerSyntax(content) {
  // 将 :::: 转换为 :::
  // 匹配 :::: tip, :::: warning, :::: danger 等
  return content.replace(/^::::/gm, ':::');
}

/**
 * 处理单个 Markdown 文件
 */
function processMarkdownFile(sourcePath, targetPath) {
  try {
    let content = fs.readFileSync(sourcePath, 'utf-8');
    
    // 1. 转换 Frontmatter
    content = transformFrontmatter(content);
    
    // 2. 转换容器语法
    content = transformContainerSyntax(content);
    
    // 确保目标目录存在
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // 写入目标文件
    fs.writeFileSync(targetPath, content, 'utf-8');
    stats.migratedFiles++;
    
    return true;
  } catch (error) {
    stats.errors.push({ file: sourcePath, error: error.message });
    return false;
  }
}

/**
 * 递归遍历目录并处理所有 Markdown 文件
 */
function migrateDirectory(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    return;
  }

  const entries = fs.readdirSync(sourceDir, { withFileTypes: true });
  
  for (const entry of entries) {
    const sourcePath = path.join(sourceDir, entry.name);
    const targetPath = path.join(targetDir, entry.name);
    
    if (entry.isDirectory()) {
      // 跳过 .vuepress 目录
      if (entry.name === '.vuepress') {
        continue;
      }
      migrateDirectory(sourcePath, targetPath);
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      stats.totalFiles++;
      console.log(`Migrating: ${sourcePath}`);
      processMarkdownFile(sourcePath, targetPath);
    }
  }
}

/**
 * 主函数
 */
function main() {
  console.log('='.repeat(60));
  console.log('VuePress to VitePress Migration Script');
  console.log('='.repeat(60));
  console.log(`Source: ${SOURCE_DIR}`);
  console.log(`Target: ${TARGET_DIR}`);
  console.log('');
  
  // 迁移每个分类目录
  for (const category of CATEGORIES_TO_MIGRATE) {
    const sourceDir = path.join(SOURCE_DIR, category);
    const targetDir = path.join(TARGET_DIR, category);
    
    console.log(`\n📁 Migrating category: ${category}`);
    console.log('-'.repeat(40));
    
    if (fs.existsSync(sourceDir)) {
      migrateDirectory(sourceDir, targetDir);
    } else {
      console.log(`  ⚠️ Source directory not found: ${sourceDir}`);
    }
  }
  
  // 输出统计信息
  console.log('\n' + '='.repeat(60));
  console.log('Migration Complete!');
  console.log('='.repeat(60));
  console.log(`Total files found: ${stats.totalFiles}`);
  console.log(`Successfully migrated: ${stats.migratedFiles}`);
  console.log(`Skipped: ${stats.skippedFiles}`);
  console.log(`Errors: ${stats.errors.length}`);
  
  if (stats.errors.length > 0) {
    console.log('\nErrors:');
    for (const error of stats.errors) {
      console.log(`  - ${error.file}: ${error.error}`);
    }
  }
}

// 运行迁移
main();
