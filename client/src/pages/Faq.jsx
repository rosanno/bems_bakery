import React from "react";

import Accordion from "@/components/Accordion";
import { items } from "@/constants";
import useScrollTop from "@/hooks/useScrollTop";

const Faq = () => {
  useScrollTop();

  return (
    <div className="mx-auto max-w-7xl px-3 pt-20">
      <div className="container mx-auto mt-5 md:mt-10">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">FAQ</h1>
        <Accordion items={items} />
      </div>
    </div>
  );
};

export default Faq;
