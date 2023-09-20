import React from "react";

import Container from "../components/ui/Container";
import Accordion from "../components/Accordion";
import { items } from "../constants";

const Faq = () => {
  return (
    <Container>
      <div className="container mx-auto mt-5 md:mt-10">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">FAQ</h1>
        <Accordion items={items} />
      </div>
    </Container>
  );
};

export default Faq;
