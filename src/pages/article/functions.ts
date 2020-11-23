

export function getArticleID(){
  let match = location.pathname.match(/\/article\/(\d+)/);
  return match && parseInt(match[1]) || 0;
}