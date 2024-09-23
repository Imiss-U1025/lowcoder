import log from "loglevel";
import { JSONValue } from "util/jsonTypes";

export type PanelStyle = {
  bottom: {
    h: number;
  };
  codeEditor: {
    w: number;
    h: number;
  };
};

const DefaultPanelStyle: PanelStyle = {
  bottom: {
    h: 285,
  },
  codeEditor: {
    w: 744,
    h: 468,
  },
};

//ADDED BY FRED TO SAVE enabledCollision
export function saveCollisionStatus(collisionStatus: boolean) {
  localStorage.setItem("disableCollision", String(collisionStatus));
}

// export const DefaultCollisionStatus: DisabledCollisionStatus = "true";
export function getCollisionStatus(): boolean {
  const str = localStorage.getItem("disableCollision");
  if (str === "true") {
    return true;
  }
  return false;
}

export function removeCollisionStatus() {
  localStorage.removeItem("disableCollision");
}

export function savePanelStyle(panelStyle: PanelStyle) {
  localStorage.setItem("editor_panel_style", JSON.stringify(panelStyle));
}

export function getPanelStyle(): PanelStyle {
  const str = localStorage.getItem("editor_panel_style");
  if (!str) {
    return DefaultPanelStyle;
  }
  return { ...DefaultPanelStyle, ...JSON.parse(str) };
}

export function saveMainComp(compJson: JSONValue) {
  localStorage.setItem("main_comp", JSON.stringify(compJson));
}

export function getMainCompValue(): object {
  const compStr = localStorage.getItem("main_comp");
  try {
    if (!compStr) {
      return {};
    }
    return JSON.parse(compStr);
  } catch (e) {
    log.error("get local comp fail", e);
    return {};
  }
}

export type HomeLayoutType = "list" | "card";

export function saveHomeLayout(layout: HomeLayoutType) {
  localStorage.setItem("lowcoder_home_layout", layout);
}

export function getHomeLayout(): HomeLayoutType {
  const layout = localStorage.getItem("lowcoder_home_layout");
  return layout === "list" || layout === "card" ? layout : "card";
}

export function getLocalThemeId() {
  return localStorage.getItem("theme_id");
}

export function setLocalThemeId(themeId: string) {
  return localStorage.setItem("theme_id", themeId);
}
