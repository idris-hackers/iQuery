IDRIS := idris

build: .PHONY
	$(IDRIS) -p iquery --codegen javascript -o state.js state.idr

clean: .PHONY
	rm -f *.ibc
	rm -f *.js

.PHONY:
