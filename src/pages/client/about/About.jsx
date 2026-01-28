import React from 'react';
import { Users, ShieldCheck, History, Award, CheckCircle } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-gray-900">
                    <img
                        src="https://images.unsplash.com/photo-1558980394-0a06c46e6024?q=80&w=2070&auto=format&fit=crop"
                        alt="About Hero"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
                        Más que motos, <br /> una <span className="text-yellow-400">Pasión</span>
                    </h1>
                    <p className="text-xl text-gray-300 font-light leading-relaxed">
                        Desde 2010, Land Roys ha liderado el mercado ofreciendo no solo vehículos,
                        sino experiencias de libertad y aventura para cada conductor.
                    </p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-yellow-400">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-black">
                    <div className="p-4">
                        <div className="text-5xl font-extrabold mb-2">15+</div>
                        <div className="text-sm font-bold uppercase tracking-widest">Años de Experiencia</div>
                    </div>
                    <div className="p-4">
                        <div className="text-5xl font-extrabold mb-2">5k+</div>
                        <div className="text-sm font-bold uppercase tracking-widest">Motos Vendidas</div>
                    </div>
                    <div className="p-4">
                        <div className="text-5xl font-extrabold mb-2">100%</div>
                        <div className="text-sm font-bold uppercase tracking-widest">Garantía Asegurada</div>
                    </div>
                    <div className="p-4">
                        <div className="text-5xl font-extrabold mb-2">10+</div>
                        <div className="text-sm font-bold uppercase tracking-widest">Premios Ganados</div>
                    </div>
                </div>
            </section>

            {/* Story & Values */}
            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-50 blur-xl"></div>
                        <img
                            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop"
                            alt="Our Story"
                            className="relative rounded-3xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                    <div>
                        <h2 className="text-yellow-500 font-bold tracking-widest uppercase mb-2">Nuestra Historia</h2>
                        <h3 className="text-4xl font-bold text-gray-900 mb-6">El Comienzo del Viaje</h3>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Land Roys nació en un pequeño garaje con una gran visión: democratizar el acceso a motocicletas de alta calidad sin comprometer el estilo ni el rendimiento.
                        </p>
                        <p className="text-gray-600 text-lg leading-relaxed mb-6">
                            Lo que comenzó como un taller de restauración se convirtió rápidamente en una de las marcas más respetadas de la región, gracias a nuestra obsesión por los detalles y el servicio al cliente.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <ShieldCheck size={40} />, title: "Calidad Certificada", text: "Cada unidad pasa por 50 puntos de inspección rigurosos antes de llegar a tus manos." },
                        { icon: <Users size={40} />, title: "Comunidad", text: "No solo vendemos motos, construimos una familia de riders apasionados por la aventura." },
                        { icon: <History size={40} />, title: "Soporte 24/7", text: "Nuestro compromiso no termina con la venta. Estamos contigo en cada kilómetro." }
                    ].map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                            <div className="bg-white p-4 rounded-xl w-fit shadow-sm mb-6 text-gray-800 group-hover:text-yellow-500 group-hover:scale-110 transition-all">
                                {item.icon}
                            </div>
                            <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                            <p className="text-gray-500 leading-relaxed">{item.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-black py-20 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10 max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white mb-8">¿Listo para unirte a la familia?</h2>
                    <p className="text-gray-400 mb-8 text-lg">Visita nuestro showroom o agenda una prueba de manejo hoy mismo.</p>
                    <div className="flex justify-center gap-4">
                        <button className="px-8 py-3 bg-yellow-400 text-black font-bold rounded-full hover:bg-yellow-300 transition-colors transform hover:-translate-y-1">
                            Ver Modelos
                        </button>
                        <button className="px-8 py-3 border border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors">
                            Contáctanos
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
