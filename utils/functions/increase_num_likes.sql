CREATE OR REPLACE FUNCTION public.increasenumlikes()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
                BEGIN
                    UPDATE users 
                    SET numlikes = numlikes + 1
                    WHERE userid = NEW.recipientid;
                   	RETURN NULL;
                END;
            $function$
;
