import { useEffect } from "react";

const PageTerms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="max-w-7xl mx-auto px-4 m-4">
      <h2 className="text-2xl font-bold ">Last updated on 08 July 2024</h2>

      <div className="max-w-4xl flex flex-col gap-y-5 py-20">
        <div>
          <h3 className="text-xl font-bold ">
            What are these Terms of Use about?
          </h3>
          <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            These Terms of Use explain a number of things including, for
            example, the rules covering your use of our Services. These Terms of
            Use also provide information about your rights.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold ">
            Do these Terms of Use apply if I am using a mobile phone, tablet or
            laptop?
          </h3>
          <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            Yes. These Terms of Use apply regardless of the sort of device you
            are using to access our Services. This means they will apply whether
            you are using a computer, laptop, mobile phone, smart phone, tablet,
            games console or any other device.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold ">
            What happens if i do not comply with Terms of Use?
          </h3>
          <p className="prose prose-base prose-zinc mt-6 text-lg leading-8 dark:prose-invert">
            If we believe that you have not complied with these Terms of Use, we
            may: refuse your further use of and/or access to our Services;
            and/or delete your account (if applicable); and/or remove and/or
            edit any of Your Content from our Services.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PageTerms;
