import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"

export const SocialMedia = () => {
    return (
        <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Connect All Your Social Accounts</h2>
            <p className="text-lg text-gray-600">
              Seamlessly integrate with all major social platforms to manage your content from one place.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-10">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md">
              <Instagram className="h-8 w-8 md:h-10 md:w-10 text-pink-500" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md">
              <Facebook className="h-8 w-8 md:h-10 md:w-10 text-blue-600" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md">
              <Twitter className="h-8 w-8 md:h-10 md:w-10 text-blue-400" />
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center shadow-md">
              <Linkedin className="h-8 w-8 md:h-10 md:w-10 text-blue-400" />
            </div>
          </div>
        </div>
      </section>
    )
}