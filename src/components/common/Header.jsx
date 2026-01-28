import { useState, useEffect } from 'react';
import { MessageSquareQuote, Menu, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const navigate = useNavigate();

    // Reset click count after 1 second of inactivity
    useEffect(() => {
        if (clickCount === 0) return;
        const timer = setTimeout(() => setClickCount(0), 1000);
        return () => clearTimeout(timer);
    }, [clickCount]);

    const handleLogoClick = (e) => {
        if (clickCount === 2) {
            e.preventDefault();
            navigate('/login/admin');
            setClickCount(0);
        } else {
            setClickCount(prev => prev + 1);
        }
    };

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Modelos', path: '/modelos' },
        { name: 'Repuestos', path: '/repuestos' },
        { name: 'Nosotros', path: '/nosotros' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="w-full bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo & Brand */}
                    <NavLink
                        to="/"
                        onClick={handleLogoClick}
                        className="flex items-center gap-3 cursor-pointer flex-shrink-0 group"
                    >
                        <img
                            src={logo}
                            alt="Land Roys Logo"
                            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
                        />
                        <h1 className="text-2xl font-bold tracking-tighter text-gray-900 group-hover:text-black transition-colors">
                            Land <span className="text-yellow-500">Roys</span>
                        </h1>
                    </NavLink>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                className={({ isActive }) =>
                                    `relative text-sm font-bold tracking-wide transition-colors duration-300 py-2 ${isActive ? 'text-black' : 'text-gray-500 hover:text-black'
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        {/* Animated Underline */}
                                        <span
                                            className={`absolute bottom-0 left-0 h-[3px] rounded-full bg-yellow-400 transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0'
                                                }`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* CTA & Mobile Menu Button */}
                    <div className="flex items-center gap-4">
                        <NavLink
                            to="/consulta"
                            className={({ isActive }) =>
                                `hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm shadow-lg transition-all active:scale-95 duration-300 hover:shadow-xl ${isActive
                                    ? 'bg-yellow-400 text-black'
                                    : 'bg-black text-white hover:bg-gray-800'
                                }`
                            }
                        >
                            <MessageSquareQuote size={18} className="text-yellow-400" />
                            <span>CONSULTA</span>
                        </NavLink>

                        {/* Hamburger Icon */}
                        <button
                            className="md:hidden p-2 text-gray-600 hover:text-black transition-colors focus:outline-none"
                            onClick={toggleMenu}
                        >
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                onClick={toggleMenu}
            />

            {/* Mobile Menu Slider */}
            <div className={`fixed top-0 right-0 w-[75%] max-w-sm h-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <span className="font-bold text-xl">Menú</span>
                    <button onClick={toggleMenu} className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex flex-col p-6 gap-4">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            onClick={toggleMenu}
                            className={({ isActive }) =>
                                `flex items-center justify-between text-lg font-bold p-3 rounded-xl transition-all ${isActive
                                    ? 'bg-yellow-50 text-black border-l-4 border-yellow-400 pl-3'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    <div className="mt-8 pt-8 border-t border-gray-100">
                        <NavLink
                            to="/consulta"
                            onClick={toggleMenu}
                            className="flex items-center justify-center gap-2 w-full bg-black text-white font-bold py-4 rounded-xl shadow-lg hover:bg-gray-800 transition-colors"
                        >
                            <MessageSquareQuote size={20} className="text-yellow-400" />
                            HACER UNA CONSULTA
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
