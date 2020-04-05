CREATE OR REPLACE FUNCTION public.increasenummsgs()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    UPDATE users u
    set nummessages = (nummessages + 1)
    where u.userid in (new.senderid, new.receiverid);
    return new;
END;
$function$
;
