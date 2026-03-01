import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3'

export default defineConfig({
  lang: 'zh-CN',
  title: "LKJ's Blog",
  description: '个人技术博客 - 记录与分享',

  markdown: {
    config: (md) => {
      md.use(mathjax3)
    }
  },

  // 添加 MathJax 样式支持
  head: [
    ['link', { rel: 'icon', href: '/avatar.png' }],
  ],

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('mjx-')
      }
    }
  },

  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      {
        text: '目录索引',
        items: [
          { text: '数据结构与算法', link: '/algorithm/' },
          { text: '设计模式', link: '/designpartern/' },
          { text: '前端', link: '/fe/' },
          { text: 'Java', link: '/java/' },
          { text: '密码学', link: '/cryptology/' },
          { text: '其他', link: '/other/' }
        ]
      },
      { text: '关于', link: '/about' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '文章列表',
          items: [
            { text: '你好，世界', link: '/posts/hello-world' }
          ]
        }
      ],

      '/algorithm/': [
        { text: '数据结构与算法', link: '/algorithm/' },
        {
          text: '排序',
          collapsed: true,
          items: [
            { text: '冒泡排序', link: '/algorithm/sort/bubbleSort' },
            { text: '选择排序', link: '/algorithm/sort/selectSort' },
            { text: '插入排序', link: '/algorithm/sort/insertSort' },
            { text: '归并排序', link: '/algorithm/sort/mergeSort' },
            { text: '快速排序', link: '/algorithm/sort/quickSort' },
            { text: '堆排序', link: '/algorithm/sort/heapSort' }
          ]
        },
        {
          text: '数组',
          collapsed: true,
          items: [
            { text: '二分查找', link: '/algorithm/array/binarySearch' },
            { text: '搜索插入位置', link: '/algorithm/array/searchInsert' },
            { text: '移除元素', link: '/algorithm/array/removeElement' },
            { text: '移动零', link: '/algorithm/array/moveZeroes' },
            { text: '删除有序数组中的重复项', link: '/algorithm/array/removeDuplicates' },
            { text: '有序数组的平方', link: '/algorithm/array/sortedSquares' },
            { text: '长度最小的子数组', link: '/algorithm/array/minSubArrayLen' }
          ]
        },
        {
          text: '链表',
          collapsed: true,
          items: [
            { text: '链表介绍', link: '/algorithm/linkList/introduction' },
            { text: '链表的中间节点', link: '/algorithm/linkList/middleNode' },
            { text: '链表的倒数第K个节点', link: '/algorithm/linkList/getKthFromEnd' },
            { text: '删除链表的倒数第N个节点', link: '/algorithm/linkList/removeNthFromEnd' },
            { text: '移除链表元素', link: '/algorithm/linkList/removeElements' },
            { text: '环形链表', link: '/algorithm/linkList/hasCycle' },
            { text: '环形链表II', link: '/algorithm/linkList/detectCycle' },
            { text: '相交链表', link: '/algorithm/linkList/getIntersectionNode' },
            { text: '反转链表', link: '/algorithm/linkList/reverseList' },
            { text: '奇偶链表', link: '/algorithm/linkList/oddEvenList' },
            { text: '回文链表', link: '/algorithm/linkList/isPalindrome' },
            { text: '合并两个有序链表', link: '/algorithm/linkList/mergeTwoLists' },
            { text: '合并K个升序链表', link: '/algorithm/linkList/mergeKLists' }
          ]
        },
        {
          text: '哈希表',
          collapsed: true,
          items: [
            { text: '有效的字母异位词', link: '/algorithm/hash/isAnagram' },
            { text: '字母异位词分组', link: '/algorithm/hash/groupAnagrams' },
            { text: '找到字符串中所有字母异位词', link: '/algorithm/hash/findAnagrams' },
            { text: '赎金信', link: '/algorithm/hash/canConstruct' },
            { text: '两个数组的交集', link: '/algorithm/hash/intersection' },
            { text: '快乐数', link: '/algorithm/hash/isHappy' },
            { text: '两数之和', link: '/algorithm/hash/twoSum' },
            { text: '四数相加 II', link: '/algorithm/hash/fourSumCount' },
            { text: '三数之和', link: '/algorithm/hash/threeSum' },
            { text: '四数之和', link: '/algorithm/hash/fourSum' }
          ]
        },
        {
          text: '栈与队列',
          collapsed: true,
          items: [
            { text: '栈与队列的介绍', link: '/algorithm/stack/introduction' },
            { text: '栈的应用', link: '/algorithm/stack/applycation' },
            { text: '用栈实现队列', link: '/algorithm/stack/MyQueue' },
            { text: '用队列实现栈', link: '/algorithm/stack/MyStack' },
            { text: '有效的括号', link: '/algorithm/stack/isValid' },
            { text: '删除字符串中的所有相邻重复项', link: '/algorithm/stack/removeDuplicates' },
            { text: '逆波兰表达式求值', link: '/algorithm/stack/evalRPN' },
            { text: '滑动窗口最大值', link: '/algorithm/stack/maxSlidingWindow' },
            { text: '前K个高频元素', link: '/algorithm/stack/topKFrequent' },
            { text: '两数相加 II', link: '/algorithm/stack/addTwoNumbers' }
          ]
        },
        {
          text: '二叉树',
          collapsed: true,
          items: [
            { text: '二叉树介绍', link: '/algorithm/binaryTree/introduction' },
            {
              text: '深度优先遍历',
              collapsed: true,
              items: [
                { text: '二叉树的前序遍历', link: '/algorithm/binaryTree/dfs/preorderTraversal' },
                { text: '二叉树的中序遍历', link: '/algorithm/binaryTree/dfs/inorderTraversal' },
                { text: '二叉树的后序遍历', link: '/algorithm/binaryTree/dfs/postorderTraversal' },
                { text: 'N叉树的前序遍历', link: '/algorithm/binaryTree/dfs/preorder' },
                { text: 'N叉树的后序遍历', link: '/algorithm/binaryTree/dfs/postorder' }
              ]
            },
            {
              text: '广度优先遍历',
              collapsed: true,
              items: [
                { text: '二叉树的层序遍历', link: '/algorithm/binaryTree/bfs/levelOrder' },
                { text: '二叉树的层序遍历 II', link: '/algorithm/binaryTree/bfs/levelOrderBottom' },
                { text: '二叉树的右视图', link: '/algorithm/binaryTree/bfs/rightSideView' },
                { text: '二叉树的层平均值', link: '/algorithm/binaryTree/bfs/averageOfLevels' },
                { text: 'N叉树的层序遍历', link: '/algorithm/binaryTree/bfs/nLevelOrder' },
                { text: '在每个树行中找最大值', link: '/algorithm/binaryTree/bfs/largestValues' },
                { text: '填充每个节点的下一个右侧节点指针', link: '/algorithm/binaryTree/bfs/connect' },
                { text: '填充每个节点的下一个右侧节点指针 II', link: '/algorithm/binaryTree/bfs/connect2' },
                { text: '二叉树的最大深度', link: '/algorithm/binaryTree/bfs/maxDepth' },
                { text: '二叉树的最小深度', link: '/algorithm/binaryTree/bfs/minDepth' },
                { text: 'N 叉树的最大深度', link: '/algorithm/binaryTree/bfs/maxDepthN' }
              ]
            },
            {
              text: '二叉搜索树',
              collapsed: true,
              items: [
                { text: '二叉搜索树中的搜索', link: '/algorithm/binaryTree/bst/searchBST' },
                { text: '二叉搜索树的范围和', link: '/algorithm/binaryTree/bst/rangeSumBST' },
                { text: '验证二叉搜索树', link: '/algorithm/binaryTree/bst/isValidBST' },
                { text: '二叉搜索树中第K小的元素', link: '/algorithm/binaryTree/bst/kthSmallest' },
                { text: '将有序数组转换为二叉搜索树', link: '/algorithm/binaryTree/bst/sortedArrayToBST' },
                { text: '二叉搜索树中的插入操作', link: '/algorithm/binaryTree/bst/insertIntoBST' },
                { text: '二叉搜索树的最小绝对差', link: '/algorithm/binaryTree/bst/getMinimumDifference' },
                { text: '二叉搜索树中的众数', link: '/algorithm/binaryTree/bst/findMode' },
                { text: '把二叉搜索树转换为累加树', link: '/algorithm/binaryTree/bst/convertBST' },
                { text: '二叉搜索树的最近公共祖先', link: '/algorithm/binaryTree/bst/lowestCommonAncestor' }
              ]
            },
            {
              text: '其他',
              collapsed: true,
              items: [
                { text: '翻转二叉树', link: '/algorithm/binaryTree/other/invertTree' },
                { text: '平衡二叉树', link: '/algorithm/binaryTree/other/isBalanced' },
                { text: '相同的树', link: '/algorithm/binaryTree/other/isSameTree' },
                { text: '对称二叉树', link: '/algorithm/binaryTree/other/isSymmetric' },
                { text: '另一棵树的子树', link: '/algorithm/binaryTree/other/isSubtree' },
                { text: '二叉树的所有路径', link: '/algorithm/binaryTree/other/binaryTreePaths' },
                { text: '路径总和', link: '/algorithm/binaryTree/other/hasPathSum' },
                { text: '路径总和 II', link: '/algorithm/binaryTree/other/pathSum' },
                { text: '完全二叉树的节点个数', link: '/algorithm/binaryTree/other/countNodes' },
                { text: '左叶子之和', link: '/algorithm/binaryTree/other/sumOfLeftLeaves' },
                { text: '找树左下角的值', link: '/algorithm/binaryTree/other/findBottomLeftValue' },
                { text: '合并二叉树', link: '/algorithm/binaryTree/other/mergeTrees' },
                { text: '二叉树展开为链表', link: '/algorithm/binaryTree/other/flatten' },
                { text: '二叉树的最近公共祖先', link: '/algorithm/binaryTree/other/lowestCommonAncestor' },
                { text: '寻找重复的子树', link: '/algorithm/binaryTree/other/findDuplicateSubtrees' }
              ]
            }
          ]
        },
        {
          text: '回溯',
          collapsed: true,
          items: [
            { text: '回溯算法介绍', link: '/algorithm/backtrack/introduction' },
            {
              text: '组合问题',
              collapsed: true,
              items: [
                { text: '组合', link: '/algorithm/backtrack/combinationRelation/combine' },
                { text: '组合总和 III', link: '/algorithm/backtrack/combinationRelation/combinationSum3' },
                { text: '电话号码的字母组合', link: '/algorithm/backtrack/combinationRelation/letterCombinations' },
                { text: '组合总和', link: '/algorithm/backtrack/combinationRelation/combinationSum' },
                { text: '组合总和 II', link: '/algorithm/backtrack/combinationRelation/combinationSum2' },
                { text: '分割回文串', link: '/algorithm/backtrack/combinationRelation/partition' },
                { text: '复原 IP 地址', link: '/algorithm/backtrack/combinationRelation/restoreIpAddresses' }
              ]
            },
            {
              text: '子集问题',
              collapsed: true,
              items: [
                { text: '子集', link: '/algorithm/backtrack/subsetRelation/subsets' },
                { text: '子集 II', link: '/algorithm/backtrack/subsetRelation/subsetsWithDup' },
                { text: '递增子序列', link: '/algorithm/backtrack/subsetRelation/findSubsequences' }
              ]
            },
            {
              text: '排列问题',
              collapsed: true,
              items: [
                { text: '全排列', link: '/algorithm/backtrack/permuteRelation/permute' },
                { text: '全排列 II', link: '/algorithm/backtrack/permuteRelation/permuteUnique' }
              ]
            },
            {
              text: '棋盘问题',
              collapsed: true,
              items: [
                { text: 'N 皇后', link: '/algorithm/backtrack/chessRelation/solveNQueens' },
                { text: '解数独', link: '/algorithm/backtrack/chessRelation/solveSudoku' }
              ]
            }
          ]
        },
        {
          text: '贪心',
          collapsed: true,
          items: [
            { text: '贪心算法介绍', link: '/algorithm/greed/introduction' },
            { text: '分发饼干', link: '/algorithm/greed/findContentChildren' },
            { text: '摆动序列', link: '/algorithm/greed/wiggleMaxLength' },
            { text: '买卖股票的最佳时机 II', link: '/algorithm/greed/maxProfit' },
            { text: '跳跃游戏', link: '/algorithm/greed/canJump' }
          ]
        },
        {
          text: '动态规划',
          collapsed: true,
          items: [
            { text: '动态规划介绍', link: '/algorithm/dp/introduction' },
            {
              text: '基础问题',
              collapsed: true,
              items: [
                { text: '斐波那契数列', link: '/algorithm/dp/base/fib' },
                { text: '爬楼梯', link: '/algorithm/dp/base/climbStairs' },
                { text: '使用最小花费爬爬楼梯', link: '/algorithm/dp/base/minCostClimbingStairs' },
                { text: '不同路径', link: '/algorithm/dp/base/uniquePaths' },
                { text: '不同路径II', link: '/algorithm/dp/base/uniquePathsWithObstacles' },
                { text: '整数拆分', link: '/algorithm/dp/base/integerBreak' },
                { text: '不同的二叉搜索树', link: '/algorithm/dp/base/numTrees' }
              ]
            },
            {
              text: '打家劫舍问题',
              collapsed: true,
              items: [
                { text: '打家劫舍', link: '/algorithm/dp/robRelation/rob' },
                { text: '打家劫舍 II', link: '/algorithm/dp/robRelation/rob2' },
                { text: '打家劫舍 III', link: '/algorithm/dp/robRelation/rob3' },
                { text: '删除并获得点数', link: '/algorithm/dp/robRelation/deleteAndEarn' }
              ]
            },
            {
              text: '买卖股票问题',
              collapsed: true,
              items: [
                { text: '买卖股票的最佳时机', link: '/algorithm/dp/stocks/maxProfit' },
                { text: '买卖股票的最佳时机 II', link: '/algorithm/dp/stocks/maxProfit2' },
                { text: '买卖股票的最佳时机 III', link: '/algorithm/dp/stocks/maxProfit3' },
                { text: '买卖股票的最佳时机 IV', link: '/algorithm/dp/stocks/maxProfit4' }
              ]
            },
            {
              text: '子序列问题',
              collapsed: true,
              items: [
                { text: '最长递增子序列的长度', link: '/algorithm/dp/subSequenceRelation/lengthOfLIS' },
                { text: '最长连续递增序列', link: '/algorithm/dp/subSequenceRelation/findLengthOfLCIS' },
                { text: '最大子数组和', link: '/algorithm/dp/subSequenceRelation/maxSubArray' },
                { text: '最长重复子数组', link: '/algorithm/dp/subSequenceRelation/findLength' },
                { text: '最长公共子序列', link: '/algorithm/dp/subSequenceRelation/longestCommonSubsequence' },
                { text: '最长回文子序列', link: '/algorithm/dp/subSequenceRelation/longestPalindromeSubseq' }
              ]
            },
            {
              text: '背包问题',
              collapsed: true,
              items: [
                {
                  text: '01背包',
                  collapsed: true,
                  items: [
                    { text: '分割等和子集', link: '/algorithm/dp/bag/01bag/canPartition' },
                    { text: '最后一块石头的重量 II', link: '/algorithm/dp/bag/01bag/lastStoneWeightII' },
                    { text: '目标和', link: '/algorithm/dp/bag/01bag/findTargetSumWays' },
                    { text: '一和零', link: '/algorithm/dp/bag/01bag/findMaxForm' }
                  ]
                },
                {
                  text: '完全背包',
                  collapsed: true,
                  items: [
                    { text: '零钱兑换 II', link: '/algorithm/dp/bag/fullBag/change' },
                    { text: '组合总和 Ⅳ', link: '/algorithm/dp/bag/fullBag/combinationSum4' },
                    { text: '零钱兑换', link: '/algorithm/dp/bag/fullBag/coinChange' },
                    { text: '完全平方数', link: '/algorithm/dp/bag/fullBag/numSquares' }
                  ]
                }
              ]
            }
          ]
        },
        {
          text: '数学',
          collapsed: true,
          items: [
            { text: '计数质数', link: '/algorithm/math/countPrimes' },
            { text: '七进制数', link: '/algorithm/math/convertToBase7' },
            {
              text: '位运算',
              collapsed: true,
              items: [
                { text: '位运算介绍', link: '/algorithm/math/bitOperation/introduction' },
                { text: '2 的幂', link: '/algorithm/math/bitOperation/isPowerOfTwo' },
                { text: '4 的幂', link: '/algorithm/math/bitOperation/isPowerOfFour' },
                { text: '交换数字', link: '/algorithm/math/bitOperation/swapNumbers' },
                { text: '只出现一次的数字', link: '/algorithm/math/bitOperation/singleNumber' },
                { text: '位 1 的个数', link: '/algorithm/math/bitOperation/hammingWeight' },
                { text: '汉明距离', link: '/algorithm/math/bitOperation/hammingDistance' },
                { text: '交替位二进制数', link: '/algorithm/math/bitOperation/hasAlternatingBits' },
                { text: '找出所有自己的异或总和再求和', link: '/algorithm/math/bitOperation/subsetXORSum' },
                { text: '两整数之和', link: '/algorithm/math/bitOperation/getSum' },
                { text: '插入', link: '/algorithm/math/bitOperation/insertBits' }
              ]
            }
          ]
        }
      ],

      '/designpartern/': [
        { text: '设计模式', link: '/designpartern/' },
        {
          text: '设计模式',
          items: [
            { text: '创建型模式', link: '/designpartern/01' },
            { text: '结构型模式', link: '/designpartern/02' },
            { text: '行为型模式', link: '/designpartern/03' }
          ]
        }
      ],

      '/fe/': [
        { text: '前端', link: '/fe/' },
        {
          text: 'CSS',
          collapsed: true,
          items: [
            { text: '浮动', link: '/fe/CSS/float' },
            { text: 'BFC', link: '/fe/CSS/bfc' }
          ]
        },
        {
          text: 'JavaScript',
          collapsed: true,
          items: [
            { text: 'IIFE', link: '/fe/JS/iife' },
            { text: '继承', link: '/fe/JS/extend' },
            { text: '构造函数', link: '/fe/JS/constructor' }
          ]
        },
        {
          text: 'Vue',
          collapsed: true,
          items: [
            { text: 'Vuex注册原理', link: '/fe/Vue/vuex注册原理' }
          ]
        },
        {
          text: 'React',
          collapsed: true,
          items: [
            { text: 'React基础', link: '/fe/React/基础' },
            { text: 'Hooks', link: '/fe/React/hooks' },
            { text: '路由', link: '/fe/React/路由' },
            { text: 'Redux', link: '/fe/React/redux' }
          ]
        }
      ],

      '/java/': [
        { text: 'Java', link: '/java/' },
        {
          text: 'JavaSE',
          collapsed: true,
          items: [
            { text: 'Java基础', link: '/java/javase/基础' },
            { text: '面向对象', link: '/java/javase/面向对象' },
            { text: 'Java类与接口', link: '/java/javase/Java类与接口' },
            { text: '集合', link: '/java/javase/集合' },
            { text: '异常', link: '/java/javase/异常' },
            { text: '注解与反射', link: '/java/javase/注解与反射' },
            { text: '并发与多线程', link: '/java/javase/并发与多线程' },
            { text: '文件IO', link: '/java/javase/文件IO' }
          ]
        },
        {
          text: 'Maven',
          collapsed: true,
          items: [
            { text: 'Maven学习', link: '/java/maven/learning' }
          ]
        },
        {
          text: 'Spring',
          collapsed: true,
          items: [
            { text: 'Spring入门', link: '/java/spring/introduction' }
          ]
        }
      ],

      '/cryptology/': [
        { text: '密码学', link: '/cryptology/' },
        {
          text: '密码学',
          items: [
            { text: '密码学基础', link: '/cryptology/00_BASIC' },
            { text: 'RSA算法', link: '/cryptology/01_RSA' },
            { text: 'DH密钥交换', link: '/cryptology/02_DH' },
            { text: '椭圆曲线密码学', link: '/cryptology/03_ECC' }
          ]
        }
      ],

      '/other/': [
        { text: '其他', link: '/other/' },
        {
          text: '技术文章',
          items: [
            { text: 'Bash脚本', link: '/other/01_BASH' },
            { text: 'SSH', link: '/other/02_SSH' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/liukj98' }
    ],

    footer: {
      message: 'Powered by VitePress',
      copyright: "© 2020 - 2026 LKJ's Blog"
    },

    outline: {
      label: '目录',
      level: [2, 3]
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换'
            }
          }
        }
      }
    }
  }
})
