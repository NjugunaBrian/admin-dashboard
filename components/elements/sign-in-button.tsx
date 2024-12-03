"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

const SignInButton = () => {
    return (
        <div>
            <Button onClick={() => toast.info("Hey there. Test Email:test@example.com, Password: password")}>
                Sign in.
            </Button>
        </div>
    )
}

export default SignInButton