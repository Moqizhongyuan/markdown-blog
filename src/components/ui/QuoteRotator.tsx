"use client";

import React, { useState, useEffect } from "react";
import { Quote, getRandomQuote } from "@/data/quotes";
import { AnimatePresence, motion } from "framer-motion";

interface QuoteRotatorProps {
  initialQuote?: Quote;
  interval?: number; // 切换间隔，单位毫秒
}

export default function QuoteRotator({
  initialQuote = getRandomQuote(),
  interval = 5000,
}: QuoteRotatorProps) {
  const [quotes, setQuotes] = useState<Quote[]>([initialQuote]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // 获取一个新的、不同的名言
      let newQuote: Quote;
      do {
        newQuote = getRandomQuote();
      } while (quotes.some((quote) => quote.content === newQuote.content));

      // 添加新名言到队列并更新索引
      setQuotes((prevQuotes) => {
        // 保持队列不超过5个名言
        const newQuotes = [...prevQuotes, newQuote].slice(-5);
        return newQuotes;
      });
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, quotes]);

  // 当前要显示的名言
  const currentQuote = quotes[currentIndex % quotes.length];

  return (
    <div className="min-h-[120px] flex items-center">
      <AnimatePresence mode="wait">
        <motion.blockquote
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
          }}
          className="border-l-4 border-gray-300 pl-4 py-2 italic text-gray-600 dark:text-gray-400 w-full"
        >
          "{currentQuote.content}"
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="text-right text-sm mt-2"
          >
            —— {currentQuote.author}
          </motion.footer>
        </motion.blockquote>
      </AnimatePresence>
    </div>
  );
}
