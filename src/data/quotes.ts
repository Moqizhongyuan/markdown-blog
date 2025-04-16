/**
 * 软件工程与编程相关名言集合
 * 包含来自著名程序员、计算机科学家和技术领袖的引言
 */

export interface Quote {
  content: string;
  author: string;
  category?: string;
}

export const engineeringQuotes: Quote[] = [
  {
    content: "简单是可靠的先决条件。",
    author: "Edsger W. Dijkstra",
    category: "design",
  },
  {
    content:
      "计算机科学的目标是做出一个计算机能够胜任的工作，而不是人能够胜任的工作。",
    author: "Edsger W. Dijkstra",
    category: "philosophy",
  },
  {
    content: "首先，解决问题。然后，才写代码。",
    author: "John Johnson",
    category: "methodology",
  },
  {
    content: "测量是改进的第一步。如果你不能测量它，你就不能改进它。",
    author: "Peter Drucker",
    category: "process",
  },
  {
    content:
      "任何傻瓜都能写出计算机能理解的代码。优秀的程序员能写出人能理解的代码。",
    author: "Martin Fowler",
    category: "coding",
  },
  {
    content: "软件工程中唯一不变的就是变化本身。",
    author: "Kent Beck",
    category: "philosophy",
  },
  {
    content: "如果你不能用简单的术语解释它，你就没有完全理解它。",
    author: "Albert Einstein",
    category: "philosophy",
  },
  {
    content:
      "调试代码比编写代码困难两倍。所以，如果你尽可能聪明地编写代码，按照定义，你就没有足够的能力来调试它。",
    author: "Brian W. Kernighan",
    category: "debugging",
  },
  {
    content: "编程不是关于打字，而是关于思考。",
    author: "Rich Hickey",
    category: "philosophy",
  },
  {
    content: "软件工程师应该以交付价值而不是代码行数来衡量生产力。",
    author: "Jim McCarthy",
    category: "productivity",
  },
  {
    content: "代码就像幽默。当你必须解释它时，它就不好了。",
    author: "Cory House",
    category: "coding",
  },
  {
    content: "没有人发现的bug不是bug。",
    author: "未知",
    category: "testing",
  },
  {
    content:
      "事实证明，最难的bug不是开发人员编写的代码中的bug，而是开发人员脑海中的bug。",
    author: "Steve Maguire",
    category: "debugging",
  },
  {
    content: "一行代码胜过千言万语。",
    author: "未知",
    category: "coding",
  },
  {
    content:
      "编程时，编写模块要设想如同和另一个程序员交流，而非仅仅是与计算机沟通。",
    author: "Donald Knuth",
    category: "communication",
  },
  {
    content: "如果你无法设计它，你可能也无法维护它。",
    author: "Milt Bryce",
    category: "design",
  },
  {
    content: "当你遇到麻烦的时候，你就有了学习的机会。",
    author: "W. Edwards Deming",
    category: "philosophy",
  },
  {
    content: "软件的设计目标是简单。那么为什么软件如此复杂？",
    author: "Grady Booch",
    category: "design",
  },
  {
    content: "优质的软件像冰山一样，八分之七都在水下看不到。",
    author: "未知",
    category: "quality",
  },
  {
    content:
      "不是因为事情困难，我们不敢尝试，而是因为我们不敢尝试，事情才变得困难。",
    author: "Seneca",
    category: "philosophy",
  },
  {
    content: "在软件世界里，大多数事情即使可行，也不一定值得做。",
    author: "Donald Knuth",
    category: "philosophy",
  },
  {
    content:
      "编程的终极目标不是让计算机理解你写的程序，而是让其他程序员能够理解它。",
    author: "Harold Abelson",
    category: "communication",
  },
  {
    content:
      "优秀的代码是它自己最好的文档。当你准备添加一个注释时，问问自己，'我如何改进代码，让这个注释变得不必要？'",
    author: "Steve McConnell",
    category: "documentation",
  },
  {
    content: "不要急于求成，要追求完美。",
    author: "未知",
    category: "philosophy",
  },
  {
    content: "软件就像做爱。一次犯错，你需要支持它的余生。",
    author: "Michael Sinz",
    category: "maintenance",
  },
  {
    content: "代码审查应该是一个看优点而不是找错误的过程。",
    author: "Karl Wiegers",
    category: "review",
  },
  {
    content: "今天的程序是明天的遗留系统。",
    author: "未知",
    category: "legacy",
  },
  {
    content: "我不关心它能不能运行在你的机器上！我们不发布你的机器！",
    author: "Vidiu Platon",
    category: "deployment",
  },
  {
    content: "复杂性是递增的，它比单纯的特性累加要多得多。",
    author: "Gerry Weinberg",
    category: "complexity",
  },
  {
    content: "如果你不能把问题简单化，那么你根本不了解这个问题。",
    author: "未知",
    category: "problem-solving",
  },
  {
    content:
      "构建软件的两种方法：一种是使它足够简单，以至于显而易见没有缺陷；另一种是使它足够复杂，以至于没有明显的缺陷。",
    author: "C.A.R. Hoare",
    category: "complexity",
  },
  {
    content: "了解什么时候不编写代码和何时删除代码与知道何时编写代码一样重要。",
    author: "未知",
    category: "coding",
  },
  {
    content:
      "编程，在某种意义上，是以人类思维能理解的方式告诉计算机如何用计算机语言思考。",
    author: "Donald Knuth",
    category: "philosophy",
  },
  {
    content:
      "软件工程师不关心将来维护他的代码的人是谁，因为如果代码足够糟糕，他就不会是那个人。",
    author: "未知",
    category: "maintenance",
  },
  {
    content: "预测很难，尤其是关于未来的预测。",
    author: "Niels Bohr",
    category: "planning",
  },
  {
    content:
      "在众多软件开发者中，只有不成熟的人与资深人士区分开来的是，资深人士明白只有时间和金钱是真实的约束。",
    author: "未知",
    category: "project-management",
  },
  {
    content: "最好的文档是不需要使用文档的代码。",
    author: "未知",
    category: "documentation",
  },
  {
    content:
      "调试是比编程更困难的事。因此，如果你尽你所能地编写代码，那么根据定义，你没有足够的智力去调试它。",
    author: "Brian Kernighan",
    category: "debugging",
  },
  {
    content: "提前优化是万恶之源。",
    author: "Donald Knuth",
    category: "optimization",
  },
  {
    content: "代码是写给人看的，顺便能在机器上运行。",
    author: "Harold Abelson",
    category: "coding",
  },
  {
    content: "完美的设计不是没有什么可以再添加的，而是没有什么可以再拿走的。",
    author: "Antoine de Saint-Exupéry",
    category: "design",
  },
  {
    content: "我们要把复杂的事情变简单，而不是把简单的事情变复杂。",
    author: "未知",
    category: "complexity",
  },
  {
    content: "先让它工作，再让它正确，最后让它快速。",
    author: "Kent Beck",
    category: "methodology",
  },
  {
    content: "编程不是一种能力，而是一种思考方式。",
    author: "未知",
    category: "philosophy",
  },
  {
    content: "永远不要重写代码，而要重构它。",
    author: "未知",
    category: "refactoring",
  },
  {
    content: "不要重复自己（Don't Repeat Yourself）。",
    author: "Andy Hunt & Dave Thomas",
    category: "principle",
  },
  {
    content: "软件中最大的两个问题是缓存失效和命名。",
    author: "Phil Karlton",
    category: "programming",
  },
  {
    content: "世界上最强大的两件事是青春和算法。",
    author: "未知",
    category: "philosophy",
  },
  {
    content:
      "最好是编写你的代码使其看起来就像是你自己设计了编程语言，而你的程序恰好是用该语言编写的。",
    author: "未知",
    category: "coding",
  },
  {
    content: "编写代码的同时也是在创造问题。",
    author: "未知",
    category: "coding",
  },
  {
    content: "昨天的代码就是今天的技术债务。",
    author: "未知",
    category: "technical-debt",
  },
  {
    content: "软件工程不仅关于编写代码，也关于理解问题。",
    author: "未知",
    category: "problem-solving",
  },
  {
    content: "写代码是很容易的。真正的挑战在于理解问题。",
    author: "未知",
    category: "problem-solving",
  },
  {
    content: "软件工程师的专业素养并非在于创造复杂的东西，而在于驯服复杂性。",
    author: "Grady Booch",
    category: "complexity",
  },
  {
    content:
      "我曾见过的最好的程序员，不是那些精通编程语言的人，而是那些能清晰表达思想的人。",
    author: "未知",
    category: "communication",
  },
  {
    content: "软件工程师是解决特定问题的专家，而不是编写代码的人。",
    author: "未知",
    category: "problem-solving",
  },
  {
    content: "要警惕代码复制，它是敌人。",
    author: "未知",
    category: "coding",
  },
  {
    content: "不要修复在产品中没有出现的问题。",
    author: "未知",
    category: "problem-solving",
  },
  {
    content: "好的设计不是获得，而是获得的过程。",
    author: "未知",
    category: "design",
  },
  {
    content: "复杂性摧毁了软件开发人员的积极性。",
    author: "未知",
    category: "complexity",
  },
  {
    content: "使用数据结构，而不是算法。",
    author: "Rob Pike",
    category: "data-structures",
  },
  {
    content: "代码应该以你期望别人使用它的方式来编写和测试。",
    author: "未知",
    category: "testing",
  },
  {
    content: "糟糕的程序员担心代码。好的程序员担心数据结构和它们的关系。",
    author: "Linus Torvalds",
    category: "data-structures",
  },
  {
    content: "乐观的测试是悲观的发布。",
    author: "未知",
    category: "testing",
  },
  {
    content: "测试如同设计一样重要。",
    author: "未知",
    category: "testing",
  },
  {
    content: "软件工程师的首要任务不是编写代码，而是增加业务价值。",
    author: "未知",
    category: "business",
  },
  {
    content: "设计用户界面就像讲笑话一样。如果你必须解释它，那它就不好。",
    author: "未知",
    category: "ui-design",
  },
  {
    content: "代码是写出来的，不是生出来的。",
    author: "未知",
    category: "coding",
  },
  {
    content: "好的代码是设计的结果，而不是偶然的产物。",
    author: "未知",
    category: "design",
  },
  {
    content: "在软件开发中，唯一不变的是变化本身。",
    author: "未知",
    category: "philosophy",
  },
  {
    content: "清晰胜过聪明。",
    author: "未知",
    category: "coding",
  },
  {
    content:
      "一个好的设计师知道完美不是所有细节都考虑到了，而是知道什么时候停止。",
    author: "未知",
    category: "design",
  },
  {
    content: "如果一个程序不能被测试，它就不应该被构建。",
    author: "未知",
    category: "testing",
  },
  {
    content: "未测试的代码就是坏代码。",
    author: "Michael Feathers",
    category: "testing",
  },
  {
    content: "一切皆可简化。",
    author: "未知",
    category: "design",
  },
  {
    content: "程序必须为人所写，只是顺便给机器执行而已。",
    author: "Donald Knuth",
    category: "coding",
  },
  {
    content: "九个人不能在一个月内生一个孩子。",
    author: "Fred Brooks",
    category: "project-management",
  },
  {
    content: "编程中没有银弹。",
    author: "Fred Brooks",
    category: "methodology",
  },
  {
    content: "一个伟大的软件工程师不是用代码测量的。",
    author: "未知",
    category: "philosophy",
  },
  {
    content: "乐观是编程的职业病，测试是预防措施。",
    author: "Kent Beck",
    category: "testing",
  },
  {
    content: "真相只存在于一个地方：代码。",
    author: "Robert C. Martin",
    category: "truth",
  },
  {
    content: "好的接口设计比好的算法设计更难。",
    author: "未知",
    category: "design",
  },
  {
    content:
      "最初的90%的代码占用了开发时间的前90%。余下的10%的代码占用了开发时间的另外90%。",
    author: "Tom Cargill",
    category: "project-management",
  },
];

/**
 * 获取随机的软件工程名言
 * @param category 可选的分类过滤
 * @returns 随机的名言对象
 */
export function getRandomQuote(category?: string): Quote {
  let filteredQuotes = engineeringQuotes;

  // 如果指定了分类，过滤匹配的名言
  if (category) {
    filteredQuotes = engineeringQuotes.filter(
      (quote) => quote.category === category
    );
    // 如果过滤后没有结果，则使用全部名言
    if (filteredQuotes.length === 0) {
      filteredQuotes = engineeringQuotes;
    }
  }

  // 随机选择一条名言
  return filteredQuotes[Math.floor(Math.random() * filteredQuotes.length)];
}
