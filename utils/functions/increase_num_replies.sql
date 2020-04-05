CREATE OR REPLACE FUNCTION public.increasenumreplies()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
                BEGIN
                    UPDATE posts 
                    SET numreplies = numreplies + 1
                    WHERE postId = NEW.postId;
                   	RETURN NULL;
                END;
            $function$
;
