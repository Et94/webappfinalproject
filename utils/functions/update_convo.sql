CREATE OR REPLACE FUNCTION public.updateconvo()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
			BEGIN
				UPDATE conversations c  
				SET    latestdate = new.date
				WHERE  c.conversationid = NEW.conversationid;
				RETURN new;
			end;
			$function$
;
