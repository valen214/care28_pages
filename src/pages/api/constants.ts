

export const PRODUCTION = !document.location.href.includes("localhost");
export const REMOTE_ORIGIN = (
  PRODUCTION ? document.location.origin : "http://18.163.56.65"
);
export const LOCAL_ORIGIN = document.location.origin;

export const IMAGE_BASE_PATH = REMOTE_ORIGIN + "/wp-content/uploads/";
export const AVATAR_BASE_PATH = REMOTE_ORIGIN + "/wp-content/uploads/avatar/";