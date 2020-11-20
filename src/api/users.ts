
export type Tag = {
  name?: string
  background?: string
  color?: string
  help?: string
};

export function transformTags(raw_tags_string?: string): Tag[] {
  if(!raw_tags_string){
    return [];
  }
  console.log(raw_tags_string);
  return raw_tags_string.split(
    ","
  ).map(tag => {
    switch(tag){
    case "power_team":
      return {
        name: "power team",
        background: "yellow",
        help: "/qna#power_team"
      }
    default:
      console.warn(`unidentified user tag:${tag}`);
      return {
        name: tag
      };
    }
  }).filter(Boolean);
}