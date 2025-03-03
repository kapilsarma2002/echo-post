import { Calendar, ChevronRight, Clock } from "lucide-react"

const featureLinks = [
    {
      title: "Content Calendar",
      description: "Plan your posts with a visual calendar that shows all your scheduled content across platforms.",
      icon: <Calendar className="h-10 w-10 text-indigo-600" />
    },
    {
      title: "Auto-scheduling",
      description: "Let our AI determine the best times to post based on your audience's activity patterns.",
      icon: <Clock className="h-10 w-10 text-indigo-600" />
    },
    {
      title: "Analytics Dashboard",
      description: "Track performance with comprehensive analytics that show engagement, reach, and growth.",
      icon: <ChevronRight className="h-10 w-10 text-indigo-600" />
    }
  ]

export const Features = () => {
    return (
        <section id="features" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Features for Social Media Success</h2>
            <p className="text-lg text-gray-600">
              Everything you need to plan, create, and schedule your social media content efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureLinks.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="mb-5 bg-indigo-50 w-16 h-16 rounded-lg flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}