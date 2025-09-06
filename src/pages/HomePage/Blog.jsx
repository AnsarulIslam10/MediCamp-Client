import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import SectionTitle from "../../components/Shared/SectionTitle/SectionTitle";

const BlogSection = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "Healthy Eating for a Strong Immune System",
      img: "https://picsum.photos/400/250?random=1",
      preview:
        "Discover how a balanced diet rich in vitamins and minerals can boost your immune system...",
      full: `
Eating the right foods plays a vital role in strengthening your immune system and protecting you from common illnesses. A diet rich in vitamins, minerals, antioxidants, and essential fatty acids supports your body’s ability to fight infections and recover faster.”

Citrus fruits such as oranges, lemons, and grapefruits are excellent sources of vitamin C, which is well-known for its immune-boosting properties. Leafy greens like spinach, kale, and broccoli provide iron, calcium, and a wide range of phytonutrients that contribute to cellular repair and defense. Nuts and seeds such as almonds, walnuts, and sunflower seeds are packed with vitamin E and healthy fats, which play a critical role in regulating immune function.

On the other hand, processed foods, refined sugars, and fried snacks weaken your immune response. They cause inflammation in the body and can suppress the production of white blood cells. Over time, this makes you more vulnerable to infections and chronic illnesses.

Hydration also plays a key role. Drinking at least 8–10 glasses of water daily ensures that nutrients are transported effectively in the body, toxins are flushed out, and cells remain active. Combining hydration with a nutrient-dense diet creates a powerful defense system.
`,
    },
    {
      id: 2,
      title: "The Importance of Regular Exercise",
      img: "https://picsum.photos/400/250?random=2",
      preview:
        "Exercise not only keeps you fit but also supports heart health and reduces stress levels...",
      full: `
Exercise is one of the most effective ways to maintain a healthy body and mind. Beyond helping you stay in shape, regular physical activity plays a crucial role in reducing stress, boosting mood, and preventing chronic diseases. Studies show that people who engage in daily movement have stronger cardiovascular systems, better metabolism, and improved mental resilience.

Cardiovascular exercises such as walking, running, swimming, or cycling improve circulation, reduce blood pressure, and strengthen your heart. Strength training, on the other hand, builds lean muscle mass, increases bone density, and helps regulate blood sugar levels. A balanced exercise routine should ideally combine both cardio and resistance training for maximum benefits.

Exercise also has profound effects on mental health. Physical activity triggers the release of endorphins—often called “happy hormones”—which elevate mood and reduce anxiety. Many people find that even a short 20-minute walk helps clear the mind and improve focus. Consistency is key; even moderate activity done regularly is far more effective than sporadic intense workouts.

Flexibility and mobility exercises, such as yoga and stretching, should not be overlooked. These practices not only reduce the risk of injury but also enhance posture and reduce chronic pain. In the long run, they keep the body agile and youthful.
`,
    },
    {
      id: 3,
      title: "Mental Wellness: Mind Over Matter",
      img: "https://picsum.photos/400/250?random=3",
      preview:
        "Mental health is as important as physical health. Learn how mindfulness can change your life...",
      full: `
Mental wellness is a cornerstone of overall health, yet it is often overlooked in comparison to physical well-being. Taking care of your mind is just as important as exercising your body or eating nutritious foods. A healthy mental state improves decision-making, relationships, creativity, and productivity, while reducing the risk of stress-related illnesses.

One of the most effective practices for maintaining mental wellness is mindfulness. By paying attention to the present moment, whether through meditation, breathing exercises, or simply focusing on your surroundings, you can reduce anxiety and improve emotional stability. Journaling is another powerful tool—writing down your thoughts and feelings provides clarity, reduces overthinking, and helps identify triggers.

Mental wellness also depends on lifestyle habits. Adequate sleep of 7–9 hours per night restores brain function, balances hormones, and reduces irritability. Nutrition plays a role too; deficiencies in vitamins like B12 or magnesium can lead to mood swings and fatigue. Regular exercise, as mentioned earlier, directly impacts mental health by reducing stress hormones and increasing endorphins.

Social support is another essential factor. Surrounding yourself with positive relationships—friends, family, or support groups—can act as a buffer against depression and loneliness. Conversely, toxic environments and negative people can drain energy and harm mental well-being.
`,
    },
  ];

  return (
    <section className="py-16">
      <SectionTitle
        title="Latest Health Articles"
        sub="Stay updated with expert advice, tips, and awareness posts."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((post) => (
          <div
            key={post.id}
            className="bg-white dark:bg-slate-900 rounded-lg shadow-card-shadow dark:shadow-none overflow-hidden"
          >
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-secondary dark:text-primary">
                {post.title}
              </h3>
              <p className="text-description dark:text-gray-200 mt-2">
                {post.preview}
              </p>
              <button
                onClick={() => setSelectedPost(post)}
                className="flex items-center gap-2 text-primary mt-4 font-medium hover:underline"
              >
                Read More <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DaisyUI Modal */}
      {selectedPost && (
        <dialog id="blogModal" className="modal modal-open">
          <div className="modal-box max-w-3xl dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-secondary dark:text-primary mb-4">
              {selectedPost.title}
            </h2>
            <img
              src={selectedPost.img}
              alt={selectedPost.title}
              className="w-full h-60 object-cover rounded-md mb-4"
            />
            <p className="text-description dark:text-gray-200 leading-relaxed">
              {selectedPost.full}
            </p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedPost(null)}
                className="btn btn-error text-white"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default BlogSection;
