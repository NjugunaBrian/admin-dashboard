import { ReactNode } from "react"

interface SiteShellProps {
    children: ReactNode
}

const SiteShell = ({ children }: SiteShellProps) => {
    return (
        <div className={"overflow-hidden grid place-items-center"}>
            <div className="w-full max-w-[1400px]">
                {children}
            </div>
        </div>
    )

}

export default SiteShell