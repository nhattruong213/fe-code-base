import { SimpleBarScroll } from "@/components/atoms/simpleBar";

import { Navigation } from "./Navigation";

export const DrawContent = () => {
  return (
    <>
      <SimpleBarScroll>
        <Navigation />
      </SimpleBarScroll>
    </>
  );
}