import React from "react";
import faq from "../../assets/animation/FAQs.gif";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";
import { Slide } from "react-awesome-reveal";
const FAQs = () => {
  return (
    <section className=" my-16">
      <SectionTitle
        title={"Frequently Asked Questions"}
        sub={"Got Questions? We’ve Got Answers"}
      ></SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-items-center">
        <Slide triggerOnce>
          <img src={faq} alt="" />
        </Slide>
        <Slide direction="right" triggerOnce>
          <div className="space-y-1">
            <div className="collapse collapse-plus bg-cyan-100 rounded-none">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                How do I join a medical camp?
              </div>
              <div className="collapse-content">
                <p>
                  You can join a medical camp by visiting the camp details page
                  on our website. Click the "Join Camp" button, which will open
                  a modal with a registration form. Fill out the form with the
                  required details and submit it to secure your spot at the
                  camp.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-cyan-100 rounded-none">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                What types of medical professionals are available at the camps?
              </div>
              <div className="collapse-content">
                <p>
                  Our camps include a variety of healthcare professionals, such
                  as general practitioners, pediatricians, gynecologists,
                  dentists, and other specialists, depending on the camp's
                  focus.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-cyan-100 rounded-none">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                How do I pay for camps?
              </div>
              <div className="collapse-content">
                <p>
                  To pay for camps, go to the Registered Camps page in your
                  dashboard. There, you'll find a Pay button next to each camp.
                  Click the button to complete your payment securely through
                  Stripe.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-cyan-100 rounded-none">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Can I cancel my registration?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, you can cancel your registration. Simply navigate to the
                  Registered Camps section in your dashboard and click the
                  Cancel button next to the camp you wish to cancel.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-cyan-100 rounded-none">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                How can I find a specific camp among all the camps?
              </div>
              <div className="collapse-content">
                <p>
                  You can easily find a specific camp by using the search bar.
                  You can search by camp name, date and time, healthcare
                  professional's name, or location to quickly locate the camp
                  you're looking for.
                </p>
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </section>
  );
};

export default FAQs;
