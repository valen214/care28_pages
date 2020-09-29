

<script>
  import TopBar from "./components/TopBar.svelte";

  export let token = localStorage.getItem("token");
  export let avatar_url = "";
  export let username = "";
  export let usertype = "";
  export let products = {
    "1": {
      name: "product NAME",
      description: "HELLO WORLD! product description"
    },
    "2": {
      name: "PRODUCT TWO",
      description: "PRODUCT TWO DESCRIPTION"
    }
  };

  console.log("products:", products);

  export let tabs;
  export let activeTab = 0;
  if(!tabs){
    if(usertype === "agent"){
      tabs = [
        "Pending Appointments",
          "Your Products",
          "Ongoing Conversations",
          "Connections"
      ];
    } else{
      tabs = [
        "Recently Browsed",
        "Appointments",
        "Conversations",
        "Connections"
      ];
    }
  }

  function doAPICall(payload){
    payload.token = localStorage.getItem("token");
    if(!payload.token){
      throw new Error("token is empty!");
    }
    return fetch(location.origin + "/wp-json/api/v1/info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
  }

  if(!token){
    location.pathname = "/login";
  }

  if(!avatar_url){
    doAPICall({
      type: "query_user",
      fields: [ "avatar" ],
    }).then(res => res.json()
    ).then(res => {
      avatar_url = "/wp-content/uploads/avatar/" + res.avatar;
    });
  }


  const pendingAppointmentButtons = `
  <div class="profile-tab-content-pending-appointment-buttons">
    <div class="profile-tab-content-pending-appointment-approve-button">
      Approve
    </div>
    <div class="profile-tab-content-pending-appointment-reject-button">
      Reject
    </div>
    <div class="profile-tab-content-pending-appointment-contact-button">
      Contact
    </div>
  </div>`;

  $: console.log(username, usertype);

</script>

<TopBar loggedin={true} />

<div class="page-root">




<div class="user-bio">
  <img class="user-bio-avatar-img"
      alt="avatar"
      src={avatar_url} />
  <div class="user-bio-text-container">
      <h2 class="user-bio-name">
          { username }
      </h2>
      <div class="user-bio-usertype">
          { usertype }
      </div>
  </div>
</div>
<div class="profile-tabs-group">
  {#each tabs as tab, i}
    <div class='profile-tab {i === activeTab ? 'active' : '' }'
        on:click={() => {
          activeTab = i;
        }}>
      {tab}
    </div>
  {/each}
</div>
<div class="profile-tab-content-container">
  
{#if usertype === "agent"}
<!----------------------------------------------------
---------------- AGENT PROFILE CONTENT -------------->
  {#if activeTab === 0}
    <div class="profile-tab-content profile-tab-content-0">
      <style>
        .profile-tab-content-pending-appointment {
          width: 360px;
          padding: 15px;
          border: 1px solid rgba(0, 0, 0, 0.2);
        }
        
        .profile-tab-content-pending-appointment:not(:last-child) {
          border-bottom: none;
        }

        .profile-tab-content-pending-appointment-buttons {
          margin-top: 15px;
        }
        .profile-tab-content-pending-appointment-approve-button,
        .profile-tab-content-pending-appointment-reject-button,
        .profile-tab-content-pending-appointment-contact-button {
          cursor: pointer;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          display: inline-block;
          padding: 10px;
          margin-right: 15px;
        }
        .profile-tab-content-pending-appointment-approve-button {
          background: #93F988;
        }
        .profile-tab-content-pending-appointment-reject-button {
          background: #FFAEAE;
        }
        .profile-tab-content-pending-appointment-contact-button {
          background: #F6FF6F;
        }
      </style>
      <div class="profile-tab-content-pending-appointment">
          Appointment <span> from user1425 </span> <br />
          of Product #5231 <i>date undecided</i>
          {@html pendingAppointmentButtons}
          
      </div>
      <div class="profile-tab-content-pending-appointment">
          Appointment <span> from user6262 </span> <br />
          of Product #1252 on <i>02 May 1012 (2 days later)</i>
          {@html pendingAppointmentButtons}
      </div>
    </div>
  {:else if activeTab === 1}
    <div class="profile-tab-content profile-tab-content-1">
      <style>
        .profile-tab-content-product {
          width: 360px;
          padding: 15px;
          border: 1px solid rgba(0, 0, 0, 0.2);
          display: inline-block;
        }
      </style>
        {#each Object.entries(products) as [ key, { name, description } ]}
          <div class="profile-tab-content-product">
            <div>
              { name }
            </div>
            <div>
              { description }
            </div>
          </div>
        {/each}
    </div>
  {:else if activeTab === 2}
    <div class="profile-tab-content profile-tab-content-2">
        Tab 3
    </div>
  {:else}
    <div class="profile-tab-content profile-tab-content-3">
        Tab 4
    </div>
  {/if}
{:else}<!-- END OF AGENT PROFILE CONTENT -->
<!------------------------------------------------------
----------------- CLIENT PROFILE CONTENT --------------->

  {#if activeTab === 0}
  <div class="profile-tab-content profile-tab-content-0">
    <style>
      .profile-tab-content-product {
        width: 360px;
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
        font-family: "Inter var", -apple-system,
            BlinkMacSystemFont, "Helvetica Neue", Helvetica, sans-serif;
      }
      
      .profile-tab-content-product:not(:last-child) {
        border-bottom: none;
      }

      .buttons-container {
        padding: 15px;
        margin-top: 15px;
      }
      .profile-tab-content-product-button {
        padding: 15px;
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.2);
        display: inline-block;
        margin-right: 15px;
        margin-top: 15px;
        background: #cd2653;
        color: white;
        font-weight: 600;
        letter-spacing: 0.0333em;
        line-height: 1.25;
      }
    </style>
    <div class="profile-tab-content-product">
        Product 1 <span> from shop 1 </span><br />
        Price: NIL <br />
        <div class="buttons-container">
          <a href="/" class="profile-tab-content-product-button">
            Mention in conversation
          </a>
          <a href="/" class="profile-tab-content-product-button">
            Make Appointment
          </a>
        </div>
    </div>
    <div class="profile-tab-content-product">
        Product 2 <span> from shop 1 </span><br />
        Price: NIL<br />
        Appointment with agent5253 on <i> 23 May 1023 (3 days after)</i>
        <div class="buttons-container">
          
          <a href="/" class="profile-tab-content-product-button">
            Change Appointment Date
          </a>
          <a href="/" class="profile-tab-content-product-button">
            Mention in conversation
          </a>
        </div>
    </div>
  </div>
  {:else if activeTab === 1}
  <div class="profile-tab-content profile-tab-content-1">
    <style>
      .profile-tab-content-appointment {
        width: 360px;
        padding: 15px;
        border: 1px solid rgba(0, 0, 0, 0.2);
      }
      
      .profile-tab-content-appointment:not(:last-child) {
        border-bottom: none;
      }
    </style>
    <div class="profile-tab-content-appointment">
      Appointment to agent5132 (Pending for agent approval) <br />
      <i>date undecided</i> <br />
      Topic: <i>to be discussed</i>
    </div>
  </div>
  {:else if activeTab === 2}
  <div class="profile-tab-content profile-tab-content-2">
    Tab 3
  </div>
  {:else}
  <div class="profile-tab-content profile-tab-content-3">
    Tab 4
  </div>
  {/if}
{/if}
</div>

<div class="profile-functionals-container">
  <div class="profile-functionals-buttons">
      <a href="/edit-profile">Edit User Profile</a>
      {#if usertype === "agent" }
        <a href="/edit-shop">Edit Shop & Products</a>
      {/if}
  </div>
</div>



</div>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(body) {
		margin: 0;
	}

  .page-root {
      padding: 15px;
      display: grid;
      grid-template-areas:
              "b f"
              "g f"
              "c f";
      grid-template-rows: 150px auto 1fr;
      grid-template-columns: 70% 1fr;
  }
  
  .page-root > .user-bio {
      grid-area: b;
  }
  .page-root > .profile-tabs-group {
      grid-area: g;
  }
  .page-root > .profile-tab-content-container {
      grid-area: c;
  }
  .page-root > .profile-functionals-container {
      grid-area: f;
  }


  .user-bio {
      display: flex;
      flex-direction: "row";
      margin-bottom: 30px;
  }
  
  .user-bio-avatar-img {
      object-fit: scale-down;
      height: 100%;
      max-width: 100%;
  }
  
  .user-bio-text-container,
  .user-bio-name,
  .user-bio-usertype {
    display: inline-block;
  }

  .user-bio-text-container {
    margin-left: 15px;
  }
  
  .user-bio-name {
    font-size: 45px;
    margin: 0 0 15px 0;
  }
  
  .user-bio-text-container {
      display: inline-flex;
      flex-direction: column;
  }






  
.profile-tabs-group {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.profile-tab {
    flex-grow: 1;

    padding: 8px;
    display: flex;
    justify-content: center;
    cursor: pointer;
    user-select: none;
}
.profile-tab:not(.active) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0;
}
.profile-tab.active {
    background: rgba(0, 0, 0, 0.05);
    
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px 5px 0 0;
}
.profile-tab:hover {
    background: rgba(0, 0, 0, 0.1);
}

</style>