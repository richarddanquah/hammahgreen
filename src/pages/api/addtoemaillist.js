import mailchimp from "@mailchimp/mailchimp_marketing";
import _ from "lodash";

export default async function handler(req, res) {
  if (req.method === "POST" && req.url === "/api/addtoemaillist") {
    // console.log(req.body);

    const { fname, lname, email } = req.body;
    // console.log(_.upperFirst(fname));
    // console.log(_.upperFirst(lname));

    mailchimp.setConfig({
      apiKey: process.env.HAMMAH_GREEN_MAILCHIMP_API_KEY,
      server: "us13",
    });

    // Create an Audience in your Mailchimp

    // const footerContactInfo = {
    //   company: "Mailchimp",
    //   address1: "675 Ponce de Leon Ave NE",
    //   address2: "Suite 5000",
    //   city: "Atlanta",
    //   state: "GA",
    //   zip: "30308",
    //   country: "US",
    // };

    // const campaignDefaults = {
    //   from_name: "Gettin' Together",
    //   from_email: "gettintogether@example.com",
    //   subject: "JS Developers Meetup",
    //   language: "EN_US",
    // };

    // async function run() {
    //   const response = await mailchimp.lists.createList({
    //     name: "HammahGreen",
    //     contact: footerContactInfo,
    //     permission_reminder: "permission_reminder",
    //     email_type_option: true,
    //     campaign_defaults: campaignDefaults,
    //   });

    //   console.log(
    //     `Successfully created an audience. The audience id is ${response.id}.`
    //   );
    // }

    // run();

    // Create an Audience in your Mailchimp

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
