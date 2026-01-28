import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Columna 1: Branding y Redes */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <img src={logo} alt="Land Roys" className="h-12 w-auto object-contain" />
                            <span className="text-xl font-bold tracking-tighter text-gray-900">
                                Land <span className="text-yellow-500">Roys</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Expertos en la venta de motos y repuestos de alta calidad. Tu pasión sobre dos ruedas comienza aquí.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/facebook" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-yellow-500 hover:shadow-md transition-all">
                                <Facebook size={20} />
                            </Link>
                            <Link to="/instagram" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-yellow-500 hover:shadow-md transition-all">
                                <Instagram size={20} />
                            </Link>
                            <Link to="/twitter" className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-yellow-500 hover:shadow-md transition-all">
                                <Twitter size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Columna 2: Enlaces Rápidos */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Empresa</h3>
                        <ul className="space-y-4">
                            <li><Link to="/sobre-nosotros" className="text-gray-500 hover:text-black text-sm transition-colors">Sobre Nosotros</Link></li>
                            <li><Link to="/modelos" className="text-gray-500 hover:text-black text-sm transition-colors">Nuestros Modelos</Link></li>
                            <li><Link to="/servicio-tecnico" className="text-gray-500 hover:text-black text-sm transition-colors">Servicio Técnico</Link></li>
                            <li><Link to="/blog" className="text-gray-500 hover:text-black text-sm transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Columna 3: Soporte */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Soporte</h3>
                        <ul className="space-y-4">
                            <li><Link to="/faq" className="text-gray-500 hover:text-black text-sm transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link to="/garantia" className="text-gray-500 hover:text-black text-sm transition-colors">Garantía</Link></li>
                            <li><Link to="/repuestos" className="text-gray-500 hover:text-black text-sm transition-colors">Repuestos</Link></li>
                            <li><Link to="/contacto" className="text-gray-500 hover:text-black text-sm transition-colors">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Columna 4: Contacto Directo */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-6">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-500 text-sm">
                                <MapPin size={18} className="text-yellow-500 shrink-0" />
                                <span>Av. Principal de Motos #123, Ciudad de México</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <Phone size={18} className="text-yellow-500 shrink-0" />
                                <span>+52 (55) 1234-5678</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-500 text-sm">
                                <Mail size={18} className="text-yellow-500 shrink-0" />
                                <span>info@landroys.com</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Línea Divisoria y Copyright */}
                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-400 text-xs">
                        © {currentYear} Land Roy's. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/privacidad" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Privacidad</Link>
                        <Link to="/terminos" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Términos</Link>
                        <Link to="/cookies" className="text-gray-400 hover:text-gray-600 text-xs transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
