import React from 'react';
import { ChevronDown } from 'lucide-react';

const ThreeDVisionPage = () => {
    return (
        <div className="p-8 max-w-5xl mx-auto font-sans text-gray-800 h-full overflow-y-auto custom-scrollbar">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Technology Corporation</h1>

            <section className="mb-8">
                <p className="mb-4 text-gray-700 leading-relaxed">
                    Our Technology Corporation was founded and has grown rapidly to become a global leader in 3D vision, industrial AI, and augmented intelligence. Our engineer industry-leading deep learning software platforms and advanced 3D cameras for industrial automation and process optimization. A suite of AI-powered machine vision solutions, We committed to boosting productivity, profitability, and operational efficiency for our customers.
                </p>
                <p className="mb-4 text-gray-700 leading-relaxed">
                    As automation requirements become increasingly complex across diverse industries, from manufacturing to semiconductors, our expertise in AI inspection and robotics positions us at the forefront of industrial AI and 3D vision applications. These include defect detection, vision guided robotics, bin picking, machine tending, depalletizing, and empowering frontline workers with AI-powered augmented reality solutions.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Innovative Automation Solutions</h2>
                <div className="mb-6 rounded-lg overflow-hidden shadow-lg border border-gray-100">
                    <img src="/vision-intro.png" alt="Innovative Automation Solutions - Validation" className="w-full h-auto object-cover" />
                </div>
                <p className="mb-4 text-gray-700 leading-relaxed">
                    We provide cutting-edge industrial AI solutions, supported by our team of expert field application engineers. We offer a full range of project support services, from feasibility studies and free proof of concept to guidance on complex automation challenges, ensuring your success and helping you to achieve your project goals.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-2">Customer Support</h3>
                <p className="mb-4 text-gray-700 leading-relaxed">
                    Headquartered in KSA, WE deliver comprehensive AI and 3D vision solutions and support to our international customer base through a global network of partners and systems integrators. We offer a range of innovative augmented intelligence and industrial automation solutions, software, and systems, that deliver time savings, cost savings, and greater productivity for end users across all sectors and industries.
                </p>
            </section>

            <section className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">AccuPick 3D Bin Picking</h3>
                    <p className="text-sm text-gray-600">
                        AccuPick 3D bin picking system is the ultimate solution for all robotic vision bin picking applications. Start bin picking in minutes from just 1-3 images. Easily handle thousands of SKUs.
                    </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">AccuPick LM Automated Material Handling</h3>
                    <p className="text-sm text-gray-600">
                        AccuPick LM is an innovative automation solution that optimizes material handling and machine tending with fast and accurate positioning, eliminating the need for structured light or 3D vision guidance.
                    </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">itcyanbuMotion Vision Guided Robotics</h3>
                    <p className="text-sm text-gray-600">
                        itcyanbuMotion is a program for optimized vision guided robotics that automatically recognizes the location of objects and adjusts the robot’s path according.
                    </p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-blue-700 mb-2">itcyanbuVision AI Vision System</h3>
                    <p className="text-sm text-gray-600">
                        itcyanbuVision is a powerful industrial AI vision system for inspection applications that offers effortless defect detection with Solomon’s rapid AI vision software.
                    </p>
                </div>
            </section>

            <div className="border-t border-gray-200 my-8"></div>

            <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Machine Vision? Definition, Applications, and Trends</h2>

            <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Introduction to Machine Vision</h3>
                <p className="mb-4 text-gray-700">
                    Machine vision is a transformative technology that integrates computer science and image processing to enable automated visual inspection and analysis across industries. This article explores the core principles of machine vision, its applications in industrial production—including automated inspection, material handling, item classification, and robot navigation—and emerging trends that could drive further advancements in the field of industrial AI.
                </p>

                <h4 className="font-bold text-gray-900 mt-4 mb-2">Machine Vision Definition</h4>
                <p className="mb-4 text-gray-700">
                    Machine vision is a technology that enables machines to analyze and interpret images, often matching or exceeding human visual capabilities. It relies on image processing algorithms and pattern recognition techniques to extract meaningful information from visual data. A typical machine vision system consists of image acquisition devices, processing algorithms, and decision-making systems.
                </p>
            </section>

            <section className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Difference between Machine Vision and Computer Vision</h3>
                <p className="mb-4 text-gray-700">While machine vision and computer vision are closely related, they serve distinct purposes:</p>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-bold text-blue-700 mb-2">Machine Vision</h4>
                        <p className="text-sm text-gray-600">
                            Machine vision is specifically designed for industrial applications, such as manufacturing and quality control. It combines specialized hardware and software to capture, process, and analyze images for automated inspection and decision-making. These systems are optimized for speed, accuracy, and reliability in industrial environments, focusing on predefined tasks.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-blue-700 mb-2">Computer Vision</h4>
                        <p className="text-sm text-gray-600">
                            Computer vision is a broader field that develops algorithms and techniques to enable computers to interpret and analyze visual data, similar to human perception. Its applications extend beyond industry to fields like robotics, autonomous vehicles, augmented reality, and medical imaging. Machine vision is a subset of computer vision, tailored for industrial automation and inspection.
                        </p>
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Components of Machine Vision Systems</h3>
                <p className="mb-4 text-gray-700">
                    Machine vision systems consist of several key components that work in unison to enable automated visual inspection and analysis. These include the host computer, frame grabber, image processor, camera, illumination device, image display, and mechanism and control system.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                    <li>The host computer acts as the central processing unit, managing data and system functions.</li>
                    <li>The frame grabber captures image data from the camera, while the image processor analyzes and processes this data.</li>
                    <li>The camera captures visual information, and the illumination device provides optimal lighting for image clarity.</li>
                    <li>The image display offers visual feedback for system operators, while the mechanism and control system allow for precise movement and operation.</li>
                </ul>
                <p className="text-gray-700">
                    Together, these components form the foundation of machine vision systems, enabling the efficient capture, analysis, and interpretation of visual data.
                </p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Industrial Applications of Machine Vision</h2>
                <p className="mb-4 text-gray-700">Machine vision is widely used across various industries. Here are some key application areas:</p>

                {/* Quality Control */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Control</h3>
                    <p className="mb-4 text-gray-700">
                        Machine vision automates quality control by detecting defects, surface flaws, and dimensional inconsistencies in products. It can quickly identify issues like foreign objects or imperfections, ensuring only compliant products are processed and classified.
                    </p>
                    <div className="mb-6 rounded-lg overflow-hidden shadow-md border border-gray-100">
                        <img src="/capsule-inspection.png" alt="Capsule Inspection Analysis" className="w-full h-auto object-cover" />
                    </div>
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-3">Analysis of the Attached Photo 🩺💊</h4>
                        <p className="text-sm text-gray-700 mb-3">
                            This image shows a machine vision inspection result for capsule packaging. It appears to be part of a quality control process aimed at automatically detecting defects in pharmaceutical capsules using AI-based computer vision.
                        </p>
                        <h5 className="font-semibold text-blue-700 text-sm mb-1">1. Detected Objects & Classification</h5>
                        <ul className="list-disc pl-5 text-sm text-gray-600 mb-3 space-y-1">
                            <li><span className="font-medium">Green boxes labeled "NG_Contain":</span> These capsules contain material and meet part of the expected condition but still have defects elsewhere (e.g., powder outside).</li>
                            <li><span className="font-medium">Orange boxes labeled "NG_Empty":</span> These capsule slots appear empty or without visible contents, which is likely a defect.</li>
                            <li><span className="font-medium">Red boxes labeled "NG_Powder":</span> Highlight small areas where powder leakage is detected, possibly due to damaged capsules or filling spillage.</li>
                        </ul>
                        <h5 className="font-semibold text-blue-700 text-sm mb-1">2. How This Relates to Machine Vision</h5>
                        <p className="text-sm text-gray-600 mb-3">
                            The image aligns with the concepts discussed: Object detection & classification to categorize capsules; Defect localization using bounding boxes; Automation to reduce inspection time and improve consistency.
                        </p>
                        <h5 className="font-semibold text-blue-700 text-sm mb-1">3. Industry Application</h5>
                        <p className="text-sm text-gray-600">
                            Widely used in pharmaceutical manufacturing to detect defective capsules, maintain safety standards, and reduce product recalls.
                        </p>
                    </div>
                </div>

                {/* Component Inspection */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Component Inspection</h3>
                    <p className="mb-4 text-gray-700">
                        During manufacturing, machine vision inspects the assembly and positioning of components. Using image matching and measurement techniques, it ensures components are correctly installed and accurately positioned, maintaining product consistency and quality.
                    </p>
                    <div className="mb-6 rounded-lg overflow-hidden shadow-md border border-gray-100">
                        <img src="/component-inspection.png" alt="Component Inspection Analysis" className="w-full h-auto object-cover" />
                    </div>
                    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                        <h4 className="font-bold text-blue-800 mb-3">Analysis of the Photo 🛠️🔍</h4>
                        <p className="text-sm text-gray-700 mb-3">
                            This image appears to show a machine vision inspection applied to an industrial or manufacturing process — potentially in electronics or mechanical component assembly — where an object is enclosed by a colored bounding box labeled “OK” indicating it passed inspection.
                        </p>
                        <h5 className="font-semibold text-blue-700 text-sm mb-1">1. Detected Object & Status</h5>
                        <ul className="list-disc pl-5 text-sm text-gray-600 mb-3 space-y-1">
                            <li>The bounding box highlights the central circular part, likely a component or feature of interest (such as a connector head, valve port, or sensor).</li>
                            <li>Labeled "OK" → The inspection system has verified that the detected item meets quality criteria.</li>
                        </ul>
                        <h5 className="font-semibold text-blue-700 text-sm mb-1">2. Machine Vision Role</h5>
                        <p className="text-sm text-gray-600 mb-3">
                            Object recognition identifies features; Quality verification confirms measurements/alignment; Automated pass/fail classification.
                        </p>
                    </div>
                </div>

                {/* Automated Assembly */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Assembly</h3>
                    <p className="mb-4 text-gray-700">
                        Machine vision guides robots and automated systems in assembly tasks by identifying and locating components. This enhances assembly speed and precision while reducing the need for manual labor.
                    </p>
                    <div className="mb-6 rounded-lg overflow-hidden shadow-md border border-gray-100">
                        <img src="/automated-assembly.png" alt="Automated Assembly" className="w-full h-auto object-cover" />
                    </div>
                </div>

                {/* Robot Navigation */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Robot Navigation</h3>
                    <p className="mb-4 text-gray-700">
                        Machine vision enables robots to navigate and position themselves accurately in complex environments. By analyzing visual data, machine vision enables robots to detect obstacles and move safely while performing material handling tasks like bin picking and depalletizing.
                    </p>
                    <div className="mb-6 rounded-lg overflow-hidden shadow-md border border-gray-100">
                        <img src="/robot-navigation.png" alt="Robot Navigation" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Benefits of Machine Vision</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <strong className="block text-gray-900 mb-1">Improved Production Efficiency and Quality</strong>
                        <p className="text-sm text-gray-600">Fast, accurate, and consistent defect detection minimizes errors and reduces waste. Machine vision ensures higher product quality while increasing production speed and throughput.</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <strong className="block text-gray-900 mb-1">Real-Time Monitoring and Feedback</strong>
                        <p className="text-sm text-gray-600">Continuous monitoring of key production parameters helps detect issues early. Immediate feedback enables quick corrective actions, ensuring smooth operations and reducing downtime.</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <strong className="block text-gray-900 mb-1">Reduced Labor Costs</strong>
                        <p className="text-sm text-gray-600">Automating visual inspection reduces reliance on manual labor, cutting costs and allowing employees to focus on more skilled tasks. This improves workforce efficiency and resource allocation.</p>
                    </div>
                    <div className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm">
                        <strong className="block text-gray-900 mb-1">Data-Driven Optimization</strong>
                        <p className="text-sm text-gray-600">Machine vision systems generate valuable insights from image data, helping manufacturers refine processes, improve quality control, and optimize production performance over time.</p>
                    </div>
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6 Key Trends in Machine Vision</h2>
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">1</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Integration with Robotics and Automation</h4>
                            <p className="text-sm text-gray-600">Machine vision is a key enabler of robotics, allowing robots to perceive and manipulate objects, driving efficiency.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">2</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Edge Computing and Embedded Vision</h4>
                            <p className="text-sm text-gray-600">Real-time processing on edge devices reduces latency and improves on-site decision-making.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">3</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Deep Learning and AI</h4>
                            <p className="text-sm text-gray-600">Convolutional neural networks (CNNs) improve automated inspection, defect detection, and adaptability.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">4</div>
                        <div>
                            <h4 className="font-bold text-gray-900">3D Vision and Depth Sensing</h4>
                            <p className="text-sm text-gray-600">Transforming bin picking and quality inspection by enabling machines to understand depth and pose.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">5</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Human-Machine Collaboration</h4>
                            <p className="text-sm text-gray-600">Enhancing operator workflows with real-time assistance and safety features.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">6</div>
                        <div>
                            <h4 className="font-bold text-gray-900">Augmented Reality (AR) Applications</h4>
                            <p className="text-sm text-gray-600">AR-powered machine vision supports training, remote assistance, and guided assembly.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-10 bg-gray-900 text-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Machine Vision Summary</h2>
                <p className="text-gray-300 mb-6">
                    Machine vision is an evolving field with broad applications and significant future potential. As technology advances, machine vision systems are becoming more intelligent and adaptable, increasingly integrated into industries to drive automation, improve efficiency, and boost productivity. These systems enable businesses to streamline operations, optimize workflows, and enhance quality control. The integration of machine vision with AI and AR further expands its capabilities, supporting real-time monitoring, learning, and interconnected processes.
                </p>
                <div className="flex flex-wrap gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">Product Case Studies</button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors">Industry Case Studies</button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors">Application Case Studies</button>
                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors">All Case Studies</button>
                </div>
            </section>

            {/* Product Case Studies Section */}
            <section className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
                    <h2 className="text-3xl font-bold text-gray-900">Product Case Studies</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* HVAC Welding */}
                    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img src="/hvac-welding.png?t=1" alt="HVAC Welding" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">HVAC Welding Quality Inspection Using AI</h3>
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                                Vision AI performs HVAC welding inspection, detecting welding defects in real time to ensure consistent quality, reduce errors, and rework.
                            </p>
                        </div>
                    </div>

                    {/* BGA Soldering */}
                    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img src="/bga-soldering.png" alt="BGA Soldering" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">BGA Soldering Inspection Using AI</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Vision AI detects BGA soldering defects, improving inspection consistency and accuracy, ensuring high-quality electronic assemblies.
                            </p>
                        </div>
                    </div>

                    {/* MLCC Defect Detection */}
                    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img src="/mlcc-capacitor.png" alt="MLCC Defect Detection" className="w-full h-4full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">MLCC Defect Detection Using AI</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Vision AI enhances Multilayer Ceramic Capacitor (MLCC) defect detection, reducing false rejection rates and increasing production yield significantly.
                            </p>
                        </div>
                    </div>

                    {/* Cookies Quality Inspection */}
                    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img src="/capsule-inspection.png" alt="Cookies Quality" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Cookies Quality Inspection Using AI</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Vision enhances cookies quality with AI-powered quality inspection, ensuring consistent appearance and high detection of broken or burnt products.
                            </p>
                        </div>
                    </div>

                    {/* Woven Fabric */}
                    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img src="/fabric-defect.png" alt="Woven Fabric" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Woven Fabric Defect Detection Using AI</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Vision deployed for woven fabric defect detection achieves precise defect identification, minimizing material waste in textile manufacturing.
                            </p>
                        </div>
                    </div>

                    {/* Surgical Mask */}
                    <div className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                            <img src="/surgical-mask.png" alt="Surgical Mask" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <div className="p-6 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Surgical Mask Inspection Using AI</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Vision utilizes deep learning technology for enhanced surgical mask inspection, ensuring every mask meets safety standards and structural integrity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-20">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Machine Vision FAQs</h2>
                    <p className="text-gray-500">Common questions about automated visual systems</p>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    <details className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 open:shadow-md">
                        <summary className="flex items-center justify-between font-bold text-gray-900 cursor-pointer list-none">
                            <span>Can machine vision systems adapt to different environmental conditions?</span>
                            <span className="transition-transform duration-300 group-open:rotate-180">
                                <ChevronDown size={20} />
                            </span>
                        </summary>
                        <div className="mt-4 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                            Yes, machine vision systems can adapt to varying environmental conditions. With proper configuration and tuning, these systems can maintain reliable performance under different lighting, background, and object conditions.
                        </div>
                    </details>

                    <details className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 open:shadow-md">
                        <summary className="flex items-center justify-between font-bold text-gray-900 cursor-pointer list-none">
                            <span>What are the advantages of machine vision in medical diagnosis?</span>
                            <span className="transition-transform duration-300 group-open:rotate-180">
                                <ChevronDown size={20} />
                            </span>
                        </summary>
                        <div className="mt-4 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                            Machine vision in medical diagnosis helps improve image analysis and accuracy of diagnosis. It provides real-time image guidance, aiding doctors in making precise decisions during surgical procedures and treatment planning.
                        </div>
                    </details>

                    <details className="group bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all duration-300 open:shadow-md">
                        <summary className="flex items-center justify-between font-bold text-gray-900 cursor-pointer list-none">
                            <span>What considerations are important for integrating and deploying machine vision systems?</span>
                            <span className="transition-transform duration-300 group-open:rotate-180">
                                <ChevronDown size={20} />
                            </span>
                        </summary>
                        <div className="mt-4 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                            Successful integration and deployment of machine vision systems require careful consideration of system compatibility with existing equipment and workflows. Stability, reliability, and extensive testing and debugging are essential to ensure the system operates effectively within the intended environment.
                        </div>
                    </details>
                </div>
            </section>






        </div>
    );
};

export default ThreeDVisionPage;
