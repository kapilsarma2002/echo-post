import { ChevronRight, Clock, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"

export const Hero = () => {
    return (
        <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col items-center text-center">
             <motion.h1 
                className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight max-w-4xl mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
            >
                Schedule your social media posts with{" "}
                <motion.span 
                    className="text-indigo-600"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    confidence
                </motion.span>
            </motion.h1>
            <p className="text-xl text-gray-600 max-w-2xl mb-10">
                Plan, schedule, and automate your social media content across all major platforms in one simple dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="px-8 py-6 text-lg">
                Get started for free
                <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-6 py-6 text-lg">
                See how it works
            </Button>
            </div>
            
            {/* Hero Image */}
            <div className="mt-16 w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="w-full h-[400px] md:h-[500px] bg-gradient-to-r from-indigo-50 to-purple-50 p-6 relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center">
                    <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <span className="ml-4 text-gray-600 text-sm">Echopost Dashboard</span>
                    </div>
                    <div className="p-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="col-span-2 space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Upcoming Posts</h3>
                            <Button variant="ghost" size="sm">View all</Button>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3].map((post) => (
                            <div key={post} className="flex items-center p-3 border border-gray-100 rounded-lg bg-white shadow-sm">
                                <div className={`w-2 h-12 rounded-full ${
                                post === 1 ? 'bg-green-400' : 
                                post === 2 ? 'bg-blue-400' : 
                                'bg-purple-400'
                                } mr-4`}></div>
                                <div className="flex-1">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-900">Summer Sale Announcement</span>
                                    <div className="flex items-center space-x-2">
                                    {post === 1 && <Instagram className="h-4 w-4 text-pink-500" />}
                                    {post === 2 && <Facebook className="h-4 w-4 text-blue-600" />}
                                    {post === 3 && <Twitter className="h-4 w-4 text-blue-400" />}
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>Today, 2:30 PM</span>
                                </div>
                                </div>
                            </div>
                            ))}
                        </div>
                        </div>
                        <div className="space-y-4">
                        <h3 className="text-lg font-medium">Analytics</h3>
                        <div className="h-48 bg-gradient-to-b from-indigo-50 to-white rounded-lg border border-gray-100 p-3 flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Engagement</span>
                            <span className="text-sm font-medium text-green-600">+24%</span>
                            </div>
                            <div className="space-y-1">
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full w-4/5 bg-indigo-500 rounded-full"></div>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full w-3/5 bg-purple-500 rounded-full"></div>
                            </div>
                            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full w-2/3 bg-blue-500 rounded-full"></div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
      </section>
    )
}