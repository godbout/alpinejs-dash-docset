<?php

namespace Tests\Unit;

use App\Docsets\Alpinejs;
use Godbout\DashDocsetBuilder\Services\DocsetBuilder;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AlpinejsTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->docset = new Alpinejs();
        $this->builder = new DocsetBuilder($this->docset);
    }

    /** @test */
    public function it_can_generate_a_table_of_contents()
    {
        $toc = $this->docset->entries(
            $this->docset->downloadedIndex()
        );

        $this->assertNotEmpty($toc);
    }

    /** @test */
    public function it_can_format_the_documentation_files()
    {
        $gitHubNavbar = 'js-header-wrapper';

        $this->assertStringContainsString(
            $gitHubNavbar,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $gitHubNavbar,
            $this->docset->format($this->docset->downloadedIndex())
        );
    }
}
