import mailchimp from "@mailchimp/mailchimp_marketing";
import _ from "lodash";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/addtoemaillist") {
    // console.log(req.body);

    const { fname, lname, email } = req.body;

    mailchimp.setConfig({
      apiKey: process.env.HAMMAH_GREEN_MAILCHIMP_API_KEY,
      server: "us13",
    });

    // Add a contact to an audience in your Mailchimp

    const listId = "42642dc7c7";
    const subscribingUser = {
      firstName: _.upperFirst(fname),
      lastName: _.upperFirst(lname),
      email: email,
    };

    async function run() {
      try {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: subscribingUser.email,
          status: "subscribed",
          merge_fields: {
            FNAME: subscribingUser.firstName,
            LNAME: subscribingUser.lastName,
          },
        });

        const hashed_email_id = response.id;

        console.log(
          `Successfully added contact as an audience member. The contact's id is ${response.id}.`
        );
        res.status(200).send({ hashed_email_id });
      } catch (error) {
        return res.status(500).send({ error });
      }
    }

    run();

    // Add a contact to an audience in your Mailchimp

    

    // Mailchimp API Health Check

    // mailchimp.setConfig({
    //   apiKey: process.env.HAMMAH_GREEN_MAILCHIMP_API_KEY,
    //   server: "us13",
    // });

    // async function run() {
    //   const response = await mailchimp.ping.get();
    //   console.log(response);
    // }
    // run();

    // Mailchimp API Health Check
  } else {
    res.status(422).send("req_method_not_supported");
  }
}
