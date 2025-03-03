export const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Loved by Content Creators</h2>
            <p className="text-lg text-gray-600">
              See what our customers have to say about their experience with Echopost.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Echopost has saved me hours every week. I can plan an entire month of content in just one sitting!",
                author: "Sarah Johnson",
                role: "Social Media Influencer",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                quote: "The auto-scheduling feature is a game changer. My engagement has increased by 40% since switching to Echopost.",
                author: "Mark Williams",
                role: "Marketing Director",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              },
              {
                quote: "I manage social media for 5 different brands, and I couldn't do it without Echopost. It's intuitive and powerful.",
                author: "Jessica Chen",
                role: "Social Media Manager",
                image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200 mr-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}