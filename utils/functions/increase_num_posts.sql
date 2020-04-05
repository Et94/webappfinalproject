CREATE OR REPLACE FUNCTION public.increasenumposts()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
                BEGIN
                    UPDATE users 
                    SET numposts = numposts + 1
                    WHERE users.userid = NEW.userid;
                   	RETURN NULL;
                END;
            $function$
;
