

export function validateUserId(name : string): string {

        if (name.length < 6) 
            return "⛔ Username must contain at least 6 characters!";

        if (name.length > 9) 
            return "⛔ Username must not contain more than 9 characters!";
        

        if (!/^[A-Za-z]{4}/.test(name)) 
            return "⛔ The first 4 characters must be alphabets!";

        if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(name)) 
            return "⛔ Username can contain only letters, digits, and underscores!";
        

        if ((name.match(/[0-9]/g) ?? []).length > 2) 
            return "⛔ Username can contain at most 2 digits!";
        

        if ((name.match(/_/g) ?? []).length > 1) 
            return "⛔ Username can contain at most 1 underscore!";
        
        return "";
    }

export function validatePassword(password : string) : string {

        if (password.length < 6) 
            return "⛔ Password must contain at least 6 characters!";
        
        if (password.length > 12) 
            return "⛔ Password length has exceeded than 12";

        if (!/[!#@$]/.test(password)) 
            return "⛔ Password must contain at least one of !, #, @, $!";

        return "";
    }