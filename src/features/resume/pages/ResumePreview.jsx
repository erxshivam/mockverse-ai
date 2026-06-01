import { Download } from "lucide-react";

function ResumePreview() {

  const data =
    JSON.parse(
      localStorage.getItem(
        "resumeData"
      )
    );

  if (!data) {

    return (

      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">

        No Resume Data Found

      </div>

    );

  }

  return (

    <div className="bg-[#020617] p-3">

      <div className="max-w-5xl mx-auto">

        <div className="print:hidden flex justify-end mb-3">

          <button
            onClick={() =>
              window.print()
            }
            className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 rounded-xl text-white font-semibold flex items-center gap-2"
          >

            <Download size={18} />

            Download PDF

          </button>

        </div>

        <div
          id="resume"
          className="bg-white text-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >

          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-6">

            <h1 className="text-4xl font-black">

              {
                data.personalInfo?.fullName ||
                "Your Name"
              }

            </h1>

            <div className="flex flex-wrap gap-3 mt-2 text-sm">

              <span>
                {
                  data.personalInfo?.email
                }
              </span>

              <span>
                {
                  data.personalInfo?.phone
                }
              </span>

              <span>
                {
                  data.personalInfo?.location
                }
              </span>

            </div>

          </div>

          <div className="grid md:grid-cols-[280px_1fr]">

            {/* LEFT */}

            <div className="bg-slate-50 p-5 border-r">

              {
                data.skills?.length > 0 && (

                  <section className="mb-5">

                    <h2 className="font-bold text-indigo-700 mb-3">

                      Skills

                    </h2>

                    <div className="flex flex-wrap gap-2">

                      {

                        data.skills.map(

                          (
                            skill,
                            index
                          ) => (

                            <span
                              key={index}
                              className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-lg text-xs"
                            >

                              {skill}

                            </span>

                          )

                        )

                      }

                    </div>

                  </section>

                )

              }

              {
                data.education?.length > 0 && (

                  <section>

                    <h2 className="font-bold text-indigo-700 mb-3">

                      Education

                    </h2>

                    {

                      data.education.map(

                        (
                          edu,
                          index
                        ) => (

                          <div
                            key={index}
                            className="mb-4"
                          >

                            <h3 className="font-semibold">

                              {
                                edu.degree
                              }

                            </h3>

                            <p className="text-sm">

                              {
                                edu.institute
                              }

                            </p>

                            <p className="text-sm text-gray-600">

                              {
                                edu.field
                              }

                            </p>

                            <p className="text-sm text-gray-600">

                              {
                                edu.score
                              }

                            </p>

                          </div>

                        )

                      )

                    }

                  </section>

                )

              }

            </div>

            {/* RIGHT */}

            <div className="p-5">

              <section className="mb-5">

                <h2 className="font-bold text-indigo-700 border-b pb-2">

                  Professional Summary

                </h2>

                <p className="mt-2 text-gray-600 leading-6">

                  Motivated professional with
                  strong problem-solving skills,
                  hands-on project experience
                  and a passion for building
                  scalable software solutions.

                </p>

              </section>

              {

                data.experiences?.length > 0 && (

                  <section className="mb-5">

                    <h2 className="font-bold text-indigo-700 border-b pb-2">

                      Experience

                    </h2>

                    {

                      data.experiences.map(

                        (
                          exp,
                          index
                        ) => (

                          <div
                            key={index}
                            className="mt-3"
                          >

                            <h3 className="font-semibold">

                              {exp.title}

                            </h3>

                            <p className="text-indigo-600 text-sm">

                              {exp.company}

                            </p>

                            <p className="text-sm mt-1 text-gray-600">

                              {
                                exp.description
                              }

                            </p>

                          </div>

                        )

                      )

                    }

                  </section>

                )

              }

              {

                data.projects?.length > 0 && (

                  <section className="mb-5">

                    <h2 className="font-bold text-indigo-700 border-b pb-2">

                      Projects

                    </h2>

                    {

                      data.projects.map(

                        (
                          project,
                          index
                        ) => (

                          <div
                            key={index}
                            className="mt-3"
                          >

                            <h3 className="font-semibold">

                              {
                                project.name
                              }

                            </h3>

                            <p className="text-indigo-600 text-sm">

                              {
                                project.tech
                              }

                            </p>

                            <p className="text-sm mt-1 text-gray-600">

                              {
                                project.description
                              }

                            </p>

                          </div>

                        )

                      )

                    }

                  </section>

                )

              }

              {

                data.customSections?.map(

                  (
                    section,
                    index
                  ) => (

                    <section
                      key={index}
                      className="mb-5"
                    >

                      <h2 className="font-bold text-indigo-700 border-b pb-2">

                        {
                          section.title
                        }

                      </h2>

                      <p className="mt-2 text-sm text-gray-600">

                        {
                          section.content
                        }

                      </p>

                    </section>

                  )

                )

              }

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default ResumePreview;