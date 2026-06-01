import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Plus,
} from "lucide-react";

function ResumeBuilder() {
    const navigate = useNavigate();

  const [personalInfo,
    setPersonalInfo] =
    useState({

      fullName: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      portfolio: "",

    });

  const [education,
    setEducation] =
    useState([

      {

        degree: "",
        institute: "",
        field: "",
        startYear: "",
        endYear: "",
        score: "",

      },

    ]);

  const [experiences,
    setExperiences] =
    useState([

      {

        title: "",
        company: "",
        description: "",

      },

    ]);

  const [projects,
    setProjects] =
    useState([

      {

        name: "",
        tech: "",
        description: "",

      },

    ]);

  const [skills,
    setSkills] =
    useState([]);

  const [skillInput,
    setSkillInput] =
    useState("");

  const [certifications,
    setCertifications] =
    useState("");

  const [achievements,
    setAchievements] =
    useState("");

  const [customSections,
    setCustomSections] =
    useState([]);

  const handlePersonalChange =
    (e) => {

      setPersonalInfo({

        ...personalInfo,

        [e.target.name]:
          e.target.value,

      });

    };

  const handleEducationChange =
    (
      index,
      e
    ) => {

      const updated =
        [...education];

      updated[index][
        e.target.name
      ] = e.target.value;

      setEducation(
        updated
      );

    };

  const addEducation =
    () => {

      setEducation([

        ...education,

        {

          degree: "",
          institute: "",
          field: "",
          startYear: "",
          endYear: "",
          score: "",

        },

      ]);

    };

  const handleExperienceChange =
    (
      index,
      e
    ) => {

      const updated =
        [...experiences];

      updated[index][
        e.target.name
      ] = e.target.value;

      setExperiences(
        updated
      );

    };

  const addExperience =
    () => {

      setExperiences([

        ...experiences,

        {

          title: "",
          company: "",
          description: "",

        },

      ]);

    };

  const handleProjectChange =
    (
      index,
      e
    ) => {

      const updated =
        [...projects];

      updated[index][
        e.target.name
      ] = e.target.value;

      setProjects(
        updated
      );

    };

  const addProject =
    () => {

      setProjects([

        ...projects,

        {

          name: "",
          tech: "",
          description: "",

        },

      ]);

    };

  const addSkill =
    () => {

      if (
        !skillInput.trim()
      ) return;

      setSkills([

        ...skills,

        skillInput,

      ]);

      setSkillInput("");

    };

  const addCustomSection =
    () => {

      setCustomSections([

        ...customSections,

        {

          title: "",
          content: "",

        },

      ]);

    };

  const handleCustomSectionChange =
    (
      index,
      field,
      value
    ) => {

      const updated =
        [...customSections];

      updated[index][field] =
        value;

      setCustomSections(
        updated
      );

    };

  const generateResume =
  () => {

    localStorage.setItem(
      "resumeData",
      JSON.stringify({

        personalInfo,
        education,
        experiences,
        projects,
        skills,
        certifications,
        achievements,
        customSections,

      })
    );

    navigate(
      "/resume-preview"
    );

  };
      return (

    <div className="min-h-screen text-white">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-black">

            Resume Builder

          </h1>

          <p className="text-slate-400 mt-3">

            Create ATS-friendly professional resumes.

          </p>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="space-y-6">

          {/* PERSONAL INFO */}

          <div className="bg-[#0F172A] border border-white/10 rounded-[28px] p-6">

            <div className="flex items-center gap-3 mb-6">

              <User
                size={22}
                className="text-indigo-400"
              />

              <h2 className="text-xl font-bold">

                Personal Information

              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={personalInfo.fullName}
                onChange={handlePersonalChange}
                className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={handlePersonalChange}
                className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={personalInfo.phone}
                onChange={handlePersonalChange}
                className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                name="location"
                placeholder="Location"
                value={personalInfo.location}
                onChange={handlePersonalChange}
                className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
              />

            </div>

          </div>

            {/* EDUCATION */}

          <div className="bg-[#0F172A] border border-white/10 rounded-[28px] p-6">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-xl font-bold">

                Education

              </h2>

              <button
                onClick={addEducation}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300"
              >

                <Plus size={16} />

                Add Education

              </button>

            </div>

            {

              education.map(

                (
                  edu,
                  index
                ) => (

                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4 mb-4"
                  >

                    <input
                      type="text"
                      name="degree"
                      placeholder="Degree"
                      value={edu.degree}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          e
                        )
                      }
                      className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />

                    <input
                      type="text"
                      name="institute"
                      placeholder="Institute"
                      value={edu.institute}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          e
                        )
                      }
                      className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />

                    <input
                      type="text"
                      name="field"
                      placeholder="Field Of Study"
                      value={edu.field}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          e
                        )
                      }
                      className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />

                    <input
                      type="text"
                      name="score"
                      placeholder="CGPA / Percentage"
                      value={edu.score}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          e
                        )
                      }
                      className="bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 outline-none"
                    />

                  </div>

                )

              )

            }

          </div>

          {/* EXPERIENCE */}

          <div className="bg-[#0F172A] border border-white/10 rounded-[28px] p-6">

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <Briefcase
                  size={22}
                  className="text-indigo-400"
                />

                <h2 className="text-xl font-bold">

                  Experience

                </h2>

              </div>

              <button
                onClick={addExperience}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold flex items-center gap-2"
              >

                <Plus size={16} />

                Add Experience

              </button>

            </div>

            {

              experiences.map(

                (
                  exp,
                  index
                ) => (

                  <div
                    key={index}
                    className="space-y-3 mb-5"
                  >

                    <input
                      type="text"
                      name="title"
                      placeholder="Job Title"
                      value={exp.title}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          e
                        )
                      }
                      className="w-full bg-[#020617] border border-white/10 rounded-2xl px-4 py-3"
                    />

                    <input
                      type="text"
                      name="company"
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          e
                        )
                      }
                      className="w-full bg-[#020617] border border-white/10 rounded-2xl px-4 py-3"
                    />

                    <textarea
                      name="description"
                      placeholder="Description"
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          index,
                          e
                        )
                      }
                      className="w-full h-24 bg-[#020617] border border-white/10 rounded-2xl p-4"
                    />

                  </div>

                )

              )

            }

          </div>

          {/* PROJECTS */}

          <div className="bg-[#0F172A] border border-white/10 rounded-[28px] p-6">

            <div className="flex items-center justify-between mb-6">

              <div className="flex items-center gap-3">

                <FolderGit2
                  size={22}
                  className="text-indigo-400"
                />

                <h2 className="text-xl font-bold">

                  Projects

                </h2>

              </div>

              <button
                onClick={addProject}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-3 font-semibold flex items-center gap-2"
              >

                <Plus size={16} />

                Add Project

              </button>

            </div>

            {

              projects.map(

                (
                  project,
                  index
                ) => (

                  <div
                    key={index}
                    className="space-y-3 mb-5"
                  >

                    <input
                      type="text"
                      name="name"
                      placeholder="Project Name"
                      value={project.name}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          e
                        )
                      }
                      className="w-full bg-[#020617] border border-white/10 rounded-2xl px-4 py-3"
                    />

                    <input
                      type="text"
                      name="tech"
                      placeholder="Tech Stack"
                      value={project.tech}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          e
                        )
                      }
                      className="w-full bg-[#020617] border border-white/10 rounded-2xl px-4 py-3"
                    />

                    <textarea
                      name="description"
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) =>
                        handleProjectChange(
                          index,
                          e
                        )
                      }
                      className="w-full h-24 bg-[#020617] border border-white/10 rounded-2xl p-4"
                    />

                  </div>

                )

              )

            }

          </div>

          {/* SKILLS */}

          <div className="bg-[#0F172A] border border-white/10 rounded-[28px] p-6">

            <h2 className="text-xl font-bold mb-5">

              Skills

            </h2>

            <div className="flex gap-3">

              <input
                type="text"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(
                    e.target.value
                  )
                }
                placeholder="Enter Skill"
                className="flex-1 bg-[#020617] border border-white/10 rounded-2xl px-4 py-3"
              />

              <button
                onClick={addSkill}
                className="bg-gradient-to-r from-indigo-600 to-violet-600 px-5 rounded-2xl"
              >

                Add

              </button>

            </div>

            <div className="flex flex-wrap gap-2 mt-4">

              {skills.map(
                (
                  skill,
                  index
                ) => (

                  <div
                    key={index}
                    className="px-3 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                  >

                    {skill}

                  </div>

                )
              )}

            </div>

          </div>

          {/* CUSTOM SECTION */}

          <div className="space-y-4">

            <button
              onClick={addCustomSection}
              className="w-full py-4 rounded-2xl border border-dashed border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 transition-all"
            >

              + Add Custom Section

            </button>

            {

              customSections.map(

                (
                  section,
                  index
                ) => (

                  <div
                    key={index}
                    className="bg-[#0F172A] border border-white/10 rounded-[28px] p-6"
                  >

                    <input
                      type="text"
                      placeholder="Section Title"
                      value={section.title}
                      onChange={(e) =>
                        handleCustomSectionChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      className="w-full bg-[#020617] border border-white/10 rounded-2xl px-4 py-3 mb-4"
                    />

                    <textarea
                      placeholder="Section Content"
                      value={section.content}
                      onChange={(e) =>
                        handleCustomSectionChange(
                          index,
                          "content",
                          e.target.value
                        )
                      }
                      className="w-full h-28 bg-[#020617] border border-white/10 rounded-2xl p-4"
                    />

                  </div>

                )

              )

            }

          </div>

        </div>

        {/* PREVIEW */}

        <div>

  <div className="sticky top-24 bg-[#0F172A] border border-white/10 rounded-[28px] p-8">

    <h2 className="text-2xl font-bold mb-8">

      Resume Actions

    </h2>

    <div className="space-y-4">

      <button
  onClick={generateResume}
  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 py-3 rounded-2xl font-semibold"
>

  Generate Resume

</button>

      <button
        onClick={() =>
          window.print()
        }
        className="w-full border border-white/10 bg-[#020617] py-3 rounded-2xl font-semibold"
      >

        Download PDF

      </button>

    </div>

  </div>

</div>

      </div>

    </div>

  );

}

export default ResumeBuilder;