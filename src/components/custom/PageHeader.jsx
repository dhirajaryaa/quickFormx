function PageHeader({ children, title, className }) {
    return (
        <div className={`flex items-center justify-between gap-2 ${className}`}>
            <h1 className='text-xl sm:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>{title}</h1>
            {children}
        </div>
    )
}

export default PageHeader
