import React from 'react'

const Header = ({ title, description, action }) => {
    return (
        <div className="flex items-center justify-between border-b pb-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {title}
                </h1>

                {description && (
                    <p className="text-muted-foreground mt-1 text-sm">
                        {description}
                    </p>
                )}
            </div>
            {action}
        </div>
    )
}

export default Header