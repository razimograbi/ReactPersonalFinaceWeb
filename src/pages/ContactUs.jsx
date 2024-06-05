import Header from "../components/GeneralComponents/Header";
import Footer from "../components/GeneralComponents/Footer";
import { Helmet } from "react-helmet";
import AddressInfo from "../components/ContactUsComponents/AddressBlockComponent";
import ContactInfo from "../components/ContactUsComponents/ContactInfoBlockComponent";
import WorkingHours from "../components/ContactUsComponents/WorkingHoursBlockComponent";
import ContactForm from "../components/ContactUsComponents/ContactFormComponent";
import ContactHeader from "../components/ContactUsComponents/ContactHeaderComponent";

// this component includes our contact and a beautiful description of how the user can contact us.
const ContactUs = () => {
  return (
    // Main container with background color styling
    <div className="text-white font-sans">
      <Helmet>
        <title>Budget Buddy - Home</title>
      </Helmet>
      <Header />
      {/* Main section with margin-top and flex alignment */}
      <section className="mt-11 bg-blue-50 dark:bg-slate-800" id="contact">
        {/* Container for centering content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <ContactHeader />
          {/* Grid for contact information */}
          <div className="flex items-stretch justify-center">
            <div className="grid md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos. Duis nec ipsum orci. Ut
                  scelerisque sagittis ante, ac tincidunt sem venenatis ut.
                </p>
                <ul className="mb-6 md:mb-0">
                  <li className="flex">
                    {/* <!-- Icon --> */}
                    <AddressInfo />
                  </li>
                  <ContactInfo />
                  <WorkingHours />
                </ul>
              </div>
              {/* <!-- Form for sending a message --> */}
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactUs;