import { FC } from "react";
import "../../style/main_page_style.css";
import { MainPageContent } from "./content";
import { MainPageHeader } from "./header";

export const MainPage: FC = () => {
  return (
    <div className="main_container">
      <MainPageHeader />

      <MainPageContent />
    </div>
  );
};
