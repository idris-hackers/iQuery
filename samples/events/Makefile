IDRIS := idris

build: .PHONY
	$(IDRIS) -p effects -p iquery events.js events.idr

clean: .PHONY
	rm -f *.ibc
	rm -f *.js

.PHONY:
