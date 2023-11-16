"use client";

import { ComponentProps } from "react";

type FSButtonProps = {
    children: React.ReactNode,
    className?: string,
} & ComponentProps<"button">

export default function FSButton(
    {children, className} : FSButtonProps
){
    return(
        <button
        className={`btn btn-accent ${className}`}
        type="submit"
        >{children}</button>
    )
}