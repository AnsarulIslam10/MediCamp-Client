import React from "react";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const Gallery = () => {
  const images = [
    "https://i.ibb.co/vCKxRG6C/imgi-57-doctor-applying-vaccine-on-a-child-in-a-sheltering.jpg",
    "https://i.ibb.co/nXYXMRs/imgi-20-a-doctor-checks-a-sick-child-inside-a-medical-tent-for-displaced-people-at-eidgah-relief-cam.jpg",
    "https://i.ibb.co/pjkDxzqs/imgi-62-male-doctor-listening-heart-beat-and-breathing-of-elderly-woman.jpg",
    "https://i.ibb.co/Z1N6qw7y/imgi-34-children-brush-their-teeth-in-the-camp.jpg",
    "https://i.ibb.co/SXqY8J0M/health.jpg",
    "https://i.ibb.co/wZZ0CRmk/health-checkup.jpg",
    "https://i.ibb.co/Y7RTJYYr/imgi-49-doctor-conducts-an-eye-examination-of-a-mid-adult-woman-during-a-rural-medical-health-care.jpg",
    "https://i.ibb.co/PsY2KchN/imgi-61-doctor-clicking-a-picture-of-a-cute-baby-after-the-examination-during-a-rural-health-care-ca.jpg",
    "https://i.ibb.co/7t2qcbjF/imgi-46-a-doctor-and-her-assistant-doctor-engaged-in-a-conversation-with-family-members-of-a-village.jpg",
    "https://i.ibb.co/s9HgvpLH/imgi-52-a-female-doctor-administers-polio-dosage-to-a-child-during-a-rural-health-care-camp.jpg",
    "https://i.ibb.co/Vpj3xzdb/imgi-55-people-are-seen-receiving-free-medical-care-at-a-makeshift-shelter-at-the-durumi-idp-camp-in.jpg",
    "https://i.ibb.co/C5NYMrMR/imgi-16-doctor-applying-vaccine-on-a-child-in-a-sheltering.jpg"
  ];

  return (
    <section className="py-16">
      <SectionTitle
        title="Highlights & Memories"
        sub="Take a glimpse into our medical camps and community services."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((src, index) => (
          <div key={index} className="w-full h-48 overflow-hidden rounded-lg">
            <img
              className="w-full h-full object-cover"
              src={src}
              alt={`Gallery ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
