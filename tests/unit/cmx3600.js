var parser = require('../../lib/cmx3600.js');
describe('CMX3600 EDL Parser', function() {
	describe('#getTitle', function() {
		var 
	});

	// Dissolve test

	// 548  HOFF_AGW V     C        00:00:08:15 00:00:08:15 01:31:52:04 01:31:52:04 
	// 548  HOFF_AGB V     D    030 00:00:00:15 00:00:05:06 01:31:52:04 01:31:56:25 
	// * FROM CLIP NAME:  HOFF_AGW_MOVINGBACKGROUND.MOV 
	// * TO CLIP NAME:  HOFF_AGW_MOVINGBACKGROUND.MOV 

	// Wipe test (duration should be 00:02)

	// 023  POND5_79 V     C        01:00:11:24 01:00:11:24 01:00:53:20 01:00:53:20 
	// 023  POND5_99 V     W001 005 01:00:08:00 01:00:09:15 01:00:53:20 01:00:55:05 
	// * FROM CLIP NAME:  POND5_79_000700186-LION-MANE-STRONG-WINDS.MOV 
	// * TO CLIP NAME:  POND5_99_033731689-LION-CUB-JUVENILE-FEROCIOUS-TE.MOV 

	// Motion change

	// 557  AQ8116_0 V     C        01:03:47:02 01:03:48:23 01:32:11:01 01:32:13:04 
	// M2   AQ8116_0       021.5                01:03:47:02 
	// * FROM CLIP NAME:  AQ8116_01_NBRD359H_PREVIEW CUTDOWN.MOV 


	// 124  AQ8108_0 V     C        01:09:50:12 01:09:50:12 01:07:23:04 01:07:23:04 
	// 124  AQ8108_B V     W001 005 01:07:32:23 01:07:37:11 01:07:23:04 01:07:27:17 
	// M2   AQ8108_0       024.0                01:09:50:12 
	// M2   AQ8108_B       024.0                01:07:32:23 
	// * FROM CLIP NAME:  AQ8108_05_52822.MP4 
	// * TO CLIP NAME:  AQ8108_05_52822.MP4 

});
