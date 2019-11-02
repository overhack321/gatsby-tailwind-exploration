import React from "react";
import create from "zustand";
import { animated, AnimatedProps } from "react-spring";
import { persist, immer } from "../../utils/zustand";
import Section from "./Section";

interface SidebarState {
  isOpen: boolean;
  closedSections: {
    [key: string]: boolean;
  };
  toggleSidebar: () => void;
  toggleSection: (id: string) => () => void;
}

const persistedState =
  typeof window === "undefined"
    ? null
    : JSON.parse(localStorage.getItem("sidebarState"));

const [useSidebar] = create<SidebarState>(
  persist(
    immer(set => ({
      isOpen: persistedState ? persistedState.isOpen : true,
      closedSections: persistedState ? persistedState.closedSections : {},
      toggleSidebar: () => {
        set((state: SidebarState) => void (state.isOpen = !state.isOpen));
      },
      toggleSection: (id: string) => () => {
        set(
          (state: SidebarState) =>
            void (state.closedSections[id] = !state.closedSections[id])
        );
      }
    }))
  )
);

function Sidebar({ style }: AnimatedProps<{ style: object }>) {
  const { closedSections, toggleSidebar, toggleSection } = useSidebar();

  return (
    <animated.div
      className="absolute top-0 left-0 h-full text-white py-12 px-6"
      style={{
        ...style,
        backgroundColor: "#121212"
      }}
    >
      <button
        className="mb-16"
        onClick={() => {
          toggleSidebar();
        }}
      >
        Close
      </button>

      <Section
        isOpen={!closedSections["1"]}
        toggleSection={toggleSection("1")}
      />
      <Section
        isOpen={!closedSections["2"]}
        toggleSection={toggleSection("2")}
      />
      <Section
        isOpen={!closedSections["3"]}
        toggleSection={toggleSection("3")}
      />
      <Section
        isOpen={!closedSections["4"]}
        toggleSection={toggleSection("4")}
      />
    </animated.div>
  );
}

export default Sidebar;
export { useSidebar };