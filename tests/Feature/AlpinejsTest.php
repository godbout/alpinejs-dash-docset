<?php

namespace Tests\Feature;

use App\Docsets\Alpinejs;
use Godbout\DashDocsetBuilder\Services\DocsetBuilder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use Wa72\HtmlPageDom\HtmlPageCrawler;

class AlpinejsTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->docset = new Alpinejs();
        $this->builder = new DocsetBuilder($this->docset);

        if (! Storage::exists($this->docset->downloadedDirectory())) {
            fwrite(STDOUT, PHP_EOL . PHP_EOL . "\e[1;33mGrabbing alpinejs..." . PHP_EOL);
            Artisan::call('grab alpinejs');
        }

        if (! Storage::exists($this->docset->file())) {
            fwrite(STDOUT, PHP_EOL . PHP_EOL . "\e[1;33mPackaging alpinejs..." . PHP_EOL);
            Artisan::call('package alpinejs');
        }
    }

    /** @test */
    public function it_has_a_table_of_contents()
    {
        Config::set(
            'database.connections.sqlite.database',
            "storage/{$this->docset->databaseFile()}"
        );

        $this->assertNotEquals(0, DB::table('searchIndex')->count());
    }

    /** @test */
    public function the_GitHub_navbar_gets_removed_from_the_dash_docset_files()
    {
        $gitHubNavbar = 'js-header-wrapper';

        $this->assertStringContainsString(
            $gitHubNavbar,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $gitHubNavbar,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function the_repository_navigation_gets_removed_from_the_dash_docset_files()
    {
        $repositoryNavitation = 'bg-gray-light pt-3 hide-full-screen mb-5';

        $this->assertStringContainsString(
            $repositoryNavitation,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $repositoryNavitation,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function the_file_navigation_gets_removed_from_the_dash_docset_files()
    {
        $fileNavigation = 'file-navigation';

        $this->assertStringContainsString(
            $fileNavigation,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $fileNavigation,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function the_repository_details_gets_removed_from_the_dash_docset_files()
    {
        $repositoryDetails = 'Box mb-3';

        $this->assertStringContainsString(
            $repositoryDetails,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $repositoryDetails,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function the_right_sidebar_gets_removed_from_the_dash_docset_files()
    {
        $rightSidebar = 'flex-shrink-0 col-12 col-md-3';

        $this->assertStringContainsString(
            $rightSidebar,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $rightSidebar,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function the_weird_box_header_gets_removed_from_the_dash_docset_files()
    {
        $weirdBoxHeader = 'Box-header';

        $this->assertStringContainsString(
            $weirdBoxHeader,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $weirdBoxHeader,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function the_content_border_gets_removed_from_the_dash_docset_files()
    {
        $contentBorderAddedClass = 'border-0 !important';

        $this->assertStringNotContainsString(
            $contentBorderAddedClass,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringContainsString(
            $contentBorderAddedClass,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function the_footer_gets_removed_from_the_dash_docset_files()
    {
        $footer = 'footer';

        $this->assertStringContainsString(
            $footer,
            Storage::get($this->docset->downloadedIndex())
        );

        $this->assertStringNotContainsString(
            $footer,
            Storage::get($this->docset->innerIndex())
        );
    }

    /** @test */
    public function it_inserts_dash_anchors_in_the_doc_files()
    {
        $this->assertStringContainsString(
            'name="//apple_ref/',
            Storage::get($this->docset->innerIndex())
        );
    }
}
