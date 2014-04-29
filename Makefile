IDRIS := idris

build: .PHONY
	$(IDRIS) --build iquery.ipkg

install:
	$(IDRIS) --install iquery.ipkg

clean: .PHONY
	$(IDRIS) --clean iquery.ipkg

rebuild: clean build

.PHONY:
