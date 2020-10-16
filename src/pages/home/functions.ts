

import type { Agent } from "../api/index";
import { makeApiInfoCall, REMOTE_ORIGIN } from "../api/index";

export async function getOutstandingAgents(
    setAgents: (a: { [key: string]: Agent }) => void
){
  let res = await makeApiInfoCall({
    type: "query_outstanding_agents"
  });
  let agents: Array<any> = (await res.json())?.agents;

  if(agents){
    let output = {};

    console.log("agents:", agents);
    agents.sort((l: any, r: any) => {
      return r.rating - l.rating;
    }).slice(0, 2).forEach(agent => {
      let value = Object.assign({}, agent);
      if(value["avatar"]){
        let path = REMOTE_ORIGIN + "/wp-content/uploads/avatar/" + value["avatar"];
        value["images"] = [ path ];
        console.log("path:", path, value);
      }
      delete value["avatar"];
      output[agent.ID] = value;
    })

    setAgents(output);
    return;

    setAgents({
      "1": {
        name: "Agent 312",
        rating: 4.6,
        area: "天水圍",
        images: [
          "/wp-content/uploads/avatar/avatar1.png",
          "/wp-content/uploads/avatar/C7djvi-" +
          "6bda7a8828925a0a8485037bfef2b2c0d7e88e4eddbb1f465a19a815fe7c2b74.jpg",
          "/wp-content/uploads/avatar/cx86Z3GqBz-",
        ]
      },
      "2": {
        name: "Agent 4123",
        rating: 4.6,
        area: "西區",
        images: [
          "/wp-content/uploads/avatar/avatar2.png",
          "/wp-content/uploads/avatar/ZUKEFY-" +
          "1c3d94776234ac83cdd5060c27a36e4980b66345761eaa343888efb3828da650.jpg",
        ]
      }
    });
  } else{
    console.error("did not receive any outstanding agents from server");
  }


}