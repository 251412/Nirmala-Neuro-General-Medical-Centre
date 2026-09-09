export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  content: string;
  author: string;
  category: string;
  publishedAt: string;
  status: 'PUBLISHED' | 'DRAFT';
  seoTitle: string;
  seoDescription: string;
}

export const blogsData: BlogPost[] = [
  {
    id: 'blog-001',
    title: 'Understanding Stroke: Warning Signs and Urgent Prevention',
    slug: 'understanding-stroke-warning-signs',
    featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
    content: `
      <h2>What is a Stroke?</h2>
      <p>A stroke occurs when blood flow to a part of the brain is interrupted or reduced, preventing brain tissue from getting essential oxygen and nutrients. Brain cells begin to die within minutes without blood flow.</p>
      
      <h3>Recognize the F.A.S.T. Warning Signs:</h3>
      <ul>
        <li><strong>Face Drooping:</strong> Does one side of the face droop or feel numb? Ask the person to smile.</li>
        <li><strong>Arm Weakness:</strong> Is one arm weak or numb? Ask the person to raise both arms up. Does one arm drift downward?</li>
        <li><strong>Speech Difficulty:</strong> Is speech slurred or hard to understand? Ask the person to repeat a simple sentence.</li>
        <li><strong>Time to Call Emergency:</strong> If someone shows any of these symptoms, even if the symptoms go away, contact our emergency desk immediately.</li>
      </ul>
      
      <p>Every second counts during a stroke. Immediate medical intervention minimizes brain tissue damage and greatly enhances recovery outcomes.</p>
    `,
    author: 'Dr Vangapandu Nirmala',
    category: 'Neurology',
    publishedAt: '2026-08-28',
    status: 'PUBLISHED',
    seoTitle: 'Understanding Stroke Symptoms & Warning Signs | Nirmala Medical Centre',
    seoDescription: 'Learn the F.A.S.T. signs of a brain stroke, prevention tips, and emergency procedures by Chief Neurologist Dr Vangapandu Nirmala.'
  },
  {
    id: 'blog-002',
    title: 'Managing Hypertension: Essential Lifestyle Tips and Medical Control',
    slug: 'managing-hypertension-lifestyle-tips',
    featuredImage: '/images/blogs/managing-hypertension.webp',
    content: `
      <h2>Living with High Blood Pressure</h2>
      <p>Hypertension is often called the silent killer because it usually develops without obvious warning symptoms. Uncontrolled high blood pressure significantly increases the risk of heart disease, stroke, and renal dysfunction.</p>
      
      <h3>Steps to Control Blood Pressure:</h3>
      <ol>
        <li><strong>Reduce Sodium Intake:</strong> Limit dietary salt to less than 2,000 mg per day.</li>
        <li><strong>Regular Exercise:</strong> Engage in 30 minutes of moderate aerobic activity like brisk walking at least 5 days a week.</li>
        <li><strong>Adopt a Heart-Healthy Diet:</strong> Focus on fresh vegetables, fruits, whole grains, and lean proteins.</li>
        <li><strong>Monitor Regularly:</strong> Keep a record of home blood pressure readings to review during medical consultations.</li>
      </ol>
      
      <p>Always consult your physician before altering your medication regimens or starting intense physical workout programs.</p>
    `,
    author: 'Dr. Rajesh Kumar',
    category: 'General Health',
    publishedAt: '2026-09-02',
    status: 'PUBLISHED',
    seoTitle: 'How to Manage High Blood Pressure (Hypertension) | Nirmala Medical',
    seoDescription: 'Discover actionable lifestyle changes and medical advice to manage high blood pressure effectively. Written by Dr. Rajesh Kumar.'
  }
];
