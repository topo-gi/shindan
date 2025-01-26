function MainComponent() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const questions = [
    {
      question: "理想の家は？",
      options: ["港区のタワマン", "郊外のマイホーム", "田舎の古民家", "竜宮城"],
    },
    {
      question: "バイクは好き？",
      options: [
        "好きだし乗っている",
        "好きだけど今は乗っていない",
        "好きではない",
        "嫌いだしうるさいし臭いし邪魔",
      ],
    },
    {
      question: "道路で芋虫を見つけたら？",
      options: ["潰す", "避けて通る", "少し眺める", "草むらに避難させる"],
    },
    {
      question: "好きな音楽のジャンルは？",
      options: [
        "ハウス・テクノ・トランス・エレクトロニック",
        "ロック、ポップ",
        "クラシック、ジャズ",
        "ヒップホップ・R&B・ソウル",
      ],
    },
    {
      question: "100万円もらったら？",
      options: ["貯金", "親にあげる", "欲しいものを買う", "寄付"],
    },
    {
      question: "ルールは守る？",
      options: ["必ず守る", "比較的守る", "あまり守らない", "自分がルール"],
    },
    {
      question: "浮気はする？",
      options: [
        "したことがないし、今後する予定もない",
        "したことはないが、今後機会があればしたい",
        "したことはあるが、今後はしない",
        "したことがあるし、今後も機会があればしたい",
      ],
    },
    {
      question: "旅行に行くなら？",
      options: ["韓国", "ハワイ", "メキシコ", "月"],
    },
    {
      question: "お酒は飲む？",
      options: ["よく飲む", "たまに飲む", "あまり飲まない", "全く飲まない"],
    },
    {
      question: "女性の何を重要視する？",
      options: ["顔", "スタイル", "性格", "相性"],
    },
  ];

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (newAnswers.length === questions.length) {
      calculateResult(newAnswers);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const calculateResult = async (finalAnswers) => {
    setLoading(true);
    let compatibility = 70;

    if (finalAnswers[0] === "田舎の古民家") {
      compatibility = 95;
    } else if (finalAnswers[0] === "竜宮城") {
      compatibility = 85;
    } else if (finalAnswers[0] === "郊外のマイホーム") {
      compatibility = 75;
    } else if (finalAnswers[0] === "港区のタワマン") {
      compatibility = 65;
    }

    if (finalAnswers[1] === "嫌いだしうるさいし臭いし邪魔") {
      compatibility += 10;
    } else if (finalAnswers[1] === "好きではない") {
      compatibility += 5;
    } else if (finalAnswers[1] === "好きだけど今は乗っていない") {
      compatibility -= 5;
    } else if (finalAnswers[1] === "好きだし乗っている") {
      compatibility -= 10;
    }

    if (finalAnswers[2] === "草むらに避難させる") {
      compatibility += 10;
    } else if (finalAnswers[2] === "少し眺める") {
      compatibility += 5;
    } else if (finalAnswers[2] === "避けて通る") {
      compatibility -= 5;
    } else if (finalAnswers[2] === "潰す") {
      compatibility -= 10;
    }

    if (finalAnswers[3] === "ハウス・テクノ・トランス・エレクトロニック") {
      compatibility += 10;
    } else {
      compatibility -= 5;
    }

    if (finalAnswers[4] === "寄付") {
      compatibility += 10;
    } else {
      compatibility -= 5;
    }

    if (finalAnswers[5] === "自分がルール") {
      compatibility += 10;
    } else {
      compatibility -= 5;
    }

    if (finalAnswers[6] === "したことはあるが、今後はしない") {
      compatibility += 10;
    } else {
      compatibility -= 5;
    }

    if (finalAnswers[7] === "メキシコ" || finalAnswers[7] === "月") {
      compatibility += 10;
    } else {
      compatibility -= 5;
    }

    if (
      finalAnswers[8] === "あまり飲まない" ||
      finalAnswers[8] === "全く飲まない"
    ) {
      compatibility += 10;
    } else {
      compatibility -= 5;
    }

    if (finalAnswers[9] === "相性") {
      compatibility += 10;
    } else {
      compatibility -= 5;
    }

    compatibility = Math.min(100, Math.max(0, compatibility));

    setResult(compatibility);
    setLoading(false);
  };
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 flex items-center justify-center">
        <div className="text-2xl font-roboto text-purple-600">
          診断結果を計算中...
        </div>
      </div>
    );
  }

  if (result !== null) {
    return (
      <div className="min-h-screen bg-[#FFFDEC] flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
          <h2 className="text-3xl font-roboto text-[#86A788] text-center mb-6">
            診断結果
          </h2>
          <div className="text-center">
            <div className="text-6xl font-bold text-[#FFCFCF] mb-4">
              {result}%
            </div>
            <p className="text-[#86A788] mb-6">
              あなたとの相性は{result}%です！
            </p>
            <button
              onClick={resetQuiz}
              className="bg-[#FFCFCF] text-white px-6 py-2 rounded-full hover:bg-[#FFB8B8] transition-colors"
            >
              もう一度診断する
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDEC] flex flex-col">
      <div className="w-full bg-[#FFE2E2] p-4 text-center">
        <h1 className="text-2xl font-roboto text-[#86A788]">
          みつとの相性診断
        </h1>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 shadow-lg max-w-md w-full mx-4">
          <div className="text-sm text-[#86A788] mb-2">
            質問 {currentQuestion + 1} / {questions.length}
          </div>
          <h2 className="text-xl font-roboto text-gray-800 mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left px-4 py-3 rounded-lg bg-[#FFE2E2] hover:bg-[#FFD5D5] transition-colors text-gray-700"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
