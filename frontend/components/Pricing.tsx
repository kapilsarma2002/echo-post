import { CheckCircle2 } from "lucide-react"
import { Button } from "./ui/button"

const prices = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for individuals just getting started.",
      features: ["5 scheduled posts per month", "Basic analytics", "1 social account"],
      buttonText: "Start for free",
      highlight: false
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Great for growing influencers and creators.",
      features: ["Unlimited scheduled posts", "Advanced analytics", "5 social accounts", "Content suggestions", "Priority support"],
      buttonText: "Get started",
      highlight: true
    },
    {
      name: "Agency",
      price: "$49",
      period: "/month",
      description: "For teams and businesses managing multiple brands.",
      features: ["Everything in Professional", "10 social accounts", "Team collaboration", "API access", "Dedicated manager"],
      buttonText: "Contact sales",
      highlight: false
    }
  ]

export const Pricing = () => {
    return (
        <section id="pricing" className="bg-gray-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-gray-600">
              Choose the plan that works best for your social media needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {prices.map((plan, index) => (
              <div 
                key={index} 
                className={`
                  bg-white rounded-xl overflow-hidden
                  ${plan.highlight ? 'ring-2 ring-indigo-600 shadow-xl scale-105 md:scale-105' : 'border border-gray-200 shadow-md'}
                  transition-all duration-300
                `}
              >
                <div className={`p-6 ${plan.highlight ? 'bg-indigo-600 text-white' : 'bg-gray-50'}`}>
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    {plan.period && <span className="ml-1 text-sm">{plan.period}</span>}
                  </div>
                  <p className={`mt-2 text-sm ${plan.highlight ? 'text-indigo-100' : 'text-gray-500'}`}>
                    {plan.description}
                  </p>
                </div>
                <div className="p-6">
                  <ul className="space-y-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button 
                      className={`w-full ${plan.highlight ? '' : 'bg-gray-900 hover:bg-gray-800'}`}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}