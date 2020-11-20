

import { makeApiInfoCall, User, REMOTE_ORIGIN } from "../../api";

export async function init(
  id: number
): Promise<User> {
  let res = await makeApiInfoCall({
    "type": "query_user",
    "id": id,
    "fields": [
      "avatar",
      "display_name",
      "phone",
      "usertype",
    ]
  }).then(res => res.json());
  
  console.log(res);

  let out: User = {};

  out.id = res["ID"];
  out.avatar = REMOTE_ORIGIN + "/wp-content/uploads/avatar/" + res.avatar;
  out.name = res.display_name;
  out.phone = res.phone;
  

  return out;
}