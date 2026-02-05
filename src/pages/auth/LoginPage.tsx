import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Globe, Info, Loader2, Smartphone, Check } from 'lucide-react';

const LoginPage = () => {
    const { signIn, signUp, signInWithGoogle, isSupabaseEnabled } = useAuth();

    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);

        try {
            const { error } = isSignUp
                ? await signUp(email, password)
                : await signIn(email, password);

            if (error) {
                setError(error.message);
            } else if (isSignUp) {
                setSuccess('Check your email for confirmation link!');
                setEmail('');
                setPassword('');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        setLoading(true);

        try {
            const { error } = await signInWithGoogle();
            if (error) {
                setError(error.message);
                setLoading(false);
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    // Bypass Supabase check to allow UI to render (Demo Mode support)
    // if (!isSupabaseEnabled) { ... }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans">
            <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-sm max-w-[480px] w-full">

                {/* Config Warning */}
                {!isSupabaseEnabled && (
                    <div className="mb-6 p-3 bg-orange-50 border border-orange-100 rounded-lg text-xs text-orange-600 flex items-center gap-2">
                        <Info size={14} className="shrink-0" />
                        <span>Demo Mode: Supabase keys missing. Login simulation only.</span>
                    </div>
                )}

                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">
                        {isSignUp ? 'Sign up' : 'Log in'}
                    </h1>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-sm font-medium text-gray-600 transition-colors">
                        <Globe size={16} className="text-blue-600" />
                        <span>English</span>
                    </button>
                </div>

                {/* Messages */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-start gap-3">
                        <Info size={18} className="shrink-0 mt-0.5" />
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl text-sm flex items-start gap-3">
                        <Check size={18} className="shrink-0 mt-0.5" />
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email Input */}
                    <div className="space-y-1">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none text-gray-900 placeholder:text-gray-400 transition-all"
                            placeholder="Please enter an email address."
                        />
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent focus:bg-white focus:border-blue-500 rounded-2xl outline-none text-gray-900 placeholder:text-gray-400 transition-all pr-24" // pr-24 for icons
                            placeholder="Please enter your password"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 text-gray-400">
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            <div className="w-px h-5 bg-gray-300"></div>
                            <Info size={20} className="hover:text-gray-600 cursor-help" />
                        </div>
                    </div>

                    {/* Options Row */}
                    {!isSignUp && (
                        <div className="flex items-center justify-between pt-1">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                                    {rememberMe && <Check size={14} className="text-white bg-blue-600" strokeWidth={3} />}
                                </div>
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <span className="text-sm text-gray-600 select-none">Remember me</span>
                            </label>
                            <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                Forgot password?
                            </button>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-lg shadow-blue-200 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            isSignUp ? 'Sign up' : 'Log in'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-gray-400 text-sm">or</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-700">Google</span>
                    </button>
                    <button
                        className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        <Smartphone size={20} className="text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Phone number</span>
                    </button>
                </div>

                {/* Footer Switch */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        {isSignUp ? "Already have an ITC account?" : "Don't have an ITC account?"}{' '}
                        <button
                            onClick={() => {
                                setIsSignUp(!isSignUp);
                                setError(null);
                                setSuccess(null);
                            }}
                            className="text-blue-600 font-semibold hover:text-blue-700 hover:underline"
                        >
                            {isSignUp ? 'Log in' : 'Sign up now'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
